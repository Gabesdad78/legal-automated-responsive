import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Database types
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user' | 'tester';
  plan: 'free' | 'single' | 'premium' | 'unlimited';
  status: 'active' | 'testing' | 'suspended';
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  user_id: string;
  filename: string;
  file_url: string;
  file_size: number;
  content_type: string;
  state: string;
  county: string;
  analysis_result: any;
  created_at: string;
  updated_at: string;
}

export interface Analysis {
  id: string;
  document_id: string;
  analysis_data: any;
  generated_response: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

// Auth helpers
export const auth = {
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Document helpers
export const documents = {
  upload: async (file: File, userId: string, state: string, county: string) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('documents')
      .upload(fileName, file);

    if (error) return { data: null, error };

    const { data: document, error: insertError } = await supabase
      .from('documents')
      .insert({
        user_id: userId,
        filename: file.name,
        file_url: data.path,
        file_size: file.size,
        content_type: file.type,
        state,
        county
      })
      .select()
      .single();

    return { data: document, error: insertError };
  },

  getByUser: async (userId: string) => {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    return { data, error };
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('id', id)
      .single();

    return { data, error };
  }
};

// Analysis helpers
export const analysis = {
  create: async (documentId: string, analysisData: any) => {
    const { data, error } = await supabase
      .from('analysis')
      .insert({
        document_id: documentId,
        analysis_data: analysisData,
        status: 'pending'
      })
      .select()
      .single();

    return { data, error };
  },

  update: async (id: string, updates: Partial<Analysis>) => {
    const { data, error } = await supabase
      .from('analysis')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  getByDocument: async (documentId: string) => {
    const { data, error } = await supabase
      .from('analysis')
      .select('*')
      .eq('document_id', documentId)
      .order('created_at', { ascending: false });

    return { data, error };
  }
};

export default supabase; 