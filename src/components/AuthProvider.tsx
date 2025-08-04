import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { auth, User } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAccess: (feature: string) => boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkUser = async () => {
      try {
        const { user: currentUser } = await auth.getCurrentUser();
        if (currentUser) {
          // Get user profile from database
          const { data: profile } = await auth.supabase
            .from('users')
            .select('*')
            .eq('id', currentUser.id)
            .single();
          
          if (profile) {
            setUser(profile);
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        try {
          const { data: profile } = await auth.supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (profile) {
            setUser(profile);
          } else {
            // Create user profile if doesn't exist
            const { data: newProfile } = await auth.supabase
              .from('users')
              .insert({
                id: session.user.id,
                email: session.user.email,
                role: 'user',
                plan: 'free',
                status: 'active'
              })
              .select()
              .single();
            
            if (newProfile) {
              setUser(newProfile);
            }
          }
        } catch (error) {
          console.error('Profile fetch error:', error);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const { data, error } = await auth.signUp(email, password);
      
      if (error) {
        toast({ 
          title: 'Sign up failed', 
          description: error.message, 
          variant: 'destructive' 
        });
        return false;
      }
      
      if (data.user) {
        toast({ 
          title: 'Sign up successful', 
          description: 'Please check your email to verify your account' 
        });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Sign up error:', error);
      toast({ 
        title: 'Sign up failed', 
        description: 'An unexpected error occurred', 
        variant: 'destructive' 
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const { data, error } = await auth.signIn(email, password);
      
      if (error) {
        toast({ 
          title: 'Login failed', 
          description: error.message, 
          variant: 'destructive' 
        });
        return false;
      }
      
      if (data.user) {
        toast({ 
          title: 'Login successful', 
          description: `Welcome back, ${email}` 
        });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      toast({ 
        title: 'Login failed', 
        description: 'An unexpected error occurred', 
        variant: 'destructive' 
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await auth.signOut();
      if (error) {
        toast({ 
          title: 'Logout failed', 
          description: error.message, 
          variant: 'destructive' 
        });
      } else {
        setUser(null);
        toast({ 
          title: 'Logged out', 
          description: 'You have been logged out successfully' 
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast({ 
        title: 'Logout failed', 
        description: 'An unexpected error occurred', 
        variant: 'destructive' 
      });
    }
  };

  const checkAccess = (feature: string): boolean => {
    if (!user) return false;
    
    // Admin has access to everything
    if (user.role === 'admin') return true;
    
    // Testers have premium access
    if (user.role === 'tester' && user.status === 'testing') {
      return ['upload', 'analysis', 'generation', 'download'].includes(feature);
    }
    
    // Regular users based on plan
    switch (user.plan) {
      case 'unlimited':
        return true;
      case 'premium':
        return ['upload', 'analysis', 'generation', 'download', 'addons'].includes(feature);
      case 'single':
        return ['upload', 'analysis', 'generation', 'download'].includes(feature);
      default:
        return false;
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin,
      login,
      signUp,
      logout,
      checkAccess,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};