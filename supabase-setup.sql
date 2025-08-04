-- Legal Automated Responsive Database Setup
-- Run this in your Supabase SQL editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user', 'tester')),
    plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'single', 'premium', 'unlimited')),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'testing', 'suspended')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create documents table
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    filename TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    content_type TEXT NOT NULL,
    state TEXT NOT NULL,
    county TEXT NOT NULL,
    analysis_result JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analysis table
CREATE TABLE IF NOT EXISTS public.analysis (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE NOT NULL,
    analysis_data JSONB NOT NULL,
    generated_response TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_sessions table for tracking usage
CREATE TABLE IF NOT EXISTS public.user_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    session_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_end TIMESTAMP WITH TIME ZONE,
    documents_analyzed INTEGER DEFAULT 0,
    features_used TEXT[]
);

-- Create audit_log table
CREATE TABLE IF NOT EXISTS public.audit_log (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    resource_type TEXT,
    resource_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON public.documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_created_at ON public.documents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analysis_document_id ON public.analysis(document_id);
CREATE INDEX IF NOT EXISTS idx_analysis_status ON public.analysis(status);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON public.audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON public.audit_log(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON public.documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_analysis_updated_at BEFORE UPDATE ON public.analysis
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON public.users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Documents policies
CREATE POLICY "Users can view own documents" ON public.documents
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own documents" ON public.documents
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own documents" ON public.documents
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own documents" ON public.documents
    FOR DELETE USING (auth.uid() = user_id);

-- Analysis policies
CREATE POLICY "Users can view own analysis" ON public.analysis
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.documents 
            WHERE documents.id = analysis.document_id 
            AND documents.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own analysis" ON public.analysis
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.documents 
            WHERE documents.id = analysis.document_id 
            AND documents.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update own analysis" ON public.analysis
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.documents 
            WHERE documents.id = analysis.document_id 
            AND documents.user_id = auth.uid()
        )
    );

-- User sessions policies
CREATE POLICY "Users can view own sessions" ON public.user_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON public.user_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON public.user_sessions
    FOR UPDATE USING (auth.uid() = user_id);

-- Audit log policies
CREATE POLICY "Users can view own audit logs" ON public.audit_log
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert audit logs" ON public.audit_log
    FOR INSERT WITH CHECK (true);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, role, plan, status)
    VALUES (
        NEW.id,
        NEW.email,
        'user',
        'free',
        'active'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to log user actions
CREATE OR REPLACE FUNCTION public.log_user_action(
    action_name TEXT,
    resource_type TEXT DEFAULT NULL,
    resource_id UUID DEFAULT NULL,
    details JSONB DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO public.audit_log (
        user_id,
        action,
        resource_type,
        resource_id,
        details,
        ip_address,
        user_agent
    ) VALUES (
        auth.uid(),
        action_name,
        resource_type,
        resource_id,
        details,
        inet_client_addr(),
        current_setting('request.headers', true)::json->>'user-agent'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check user plan limits
CREATE OR REPLACE FUNCTION public.check_user_plan_limit(
    feature_name TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
    user_plan TEXT;
    user_role TEXT;
BEGIN
    SELECT plan, role INTO user_plan, user_role
    FROM public.users
    WHERE id = auth.uid();
    
    -- Admin has unlimited access
    IF user_role = 'admin' THEN
        RETURN TRUE;
    END IF;
    
    -- Check plan-based limits
    CASE user_plan
        WHEN 'unlimited' THEN
            RETURN TRUE;
        WHEN 'premium' THEN
            RETURN feature_name IN ('upload', 'analysis', 'generation', 'download', 'addons');
        WHEN 'single' THEN
            RETURN feature_name IN ('upload', 'analysis', 'generation', 'download');
        WHEN 'free' THEN
            RETURN feature_name IN ('upload', 'analysis');
        ELSE
            RETURN FALSE;
    END CASE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for documents bucket
CREATE POLICY "Users can upload own documents" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'documents' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can view own documents" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'documents' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can update own documents" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'documents' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete own documents" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'documents' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

-- Insert sample admin user (replace with your email)
-- INSERT INTO public.users (id, email, role, plan, status)
-- VALUES (
--     '00000000-0000-0000-0000-000000000000',
--     'admin@lawdefense.com',
--     'admin',
--     'unlimited',
--     'active'
-- );

-- Create views for easier querying
CREATE OR REPLACE VIEW public.user_documents AS
SELECT 
    d.*,
    a.status as analysis_status,
    a.created_at as analysis_created_at
FROM public.documents d
LEFT JOIN public.analysis a ON d.id = a.document_id
WHERE d.user_id = auth.uid();

-- Create function to get user statistics
CREATE OR REPLACE FUNCTION public.get_user_stats()
RETURNS TABLE (
    total_documents BIGINT,
    completed_analyses BIGINT,
    pending_analyses BIGINT,
    failed_analyses BIGINT,
    total_file_size BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(d.id) as total_documents,
        COUNT(CASE WHEN a.status = 'completed' THEN 1 END) as completed_analyses,
        COUNT(CASE WHEN a.status = 'pending' THEN 1 END) as pending_analyses,
        COUNT(CASE WHEN a.status = 'failed' THEN 1 END) as failed_analyses,
        COALESCE(SUM(d.file_size), 0) as total_file_size
    FROM public.documents d
    LEFT JOIN public.analysis a ON d.id = a.document_id
    WHERE d.user_id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.users TO authenticated;
GRANT ALL ON public.documents TO authenticated;
GRANT ALL ON public.analysis TO authenticated;
GRANT ALL ON public.user_sessions TO authenticated;
GRANT ALL ON public.audit_log TO authenticated;
GRANT ALL ON public.user_documents TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_stats() TO authenticated;
GRANT EXECUTE ON FUNCTION public.log_user_action(TEXT, TEXT, UUID, JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_user_plan_limit(TEXT) TO authenticated; 