import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Scale, User, LogOut, FileText } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import LoginModal from '@/components/LoginModal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface HeaderProps {
  onNavigate?: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const handleNavigation = (section: string) => {
    onNavigate?.(section);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer" onClick={() => handleNavigation('home')}>
              <Scale className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                AI Lawsuit Defense Generator
              </span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => handleNavigation('home')} 
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('pricing')} 
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Pricing
              </button>
              <button 
                onClick={() => handleNavigation('faq')} 
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                FAQ
              </button>
              <button 
                onClick={() => handleNavigation('contact')} 
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Contact
              </button>
            </nav>
            
            <div className="flex items-center gap-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {user.email.split('@')[0]}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => handleNavigation('dashboard')}>
                      <FileText className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="outline" onClick={() => setShowLogin(true)}>
                    Login
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <LoginModal open={showLogin} onOpenChange={setShowLogin} />
    </>
  );
};

export default Header;