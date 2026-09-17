-- ==============================================================================
-- Migration: 20260917_002_create_profiles_table.sql
-- Description: Creates public.profiles table, RLS policies, updated_at trigger,
--              and automatic user profile creation trigger on auth.users.
-- Phase: 3 (Google Login + User Profile)
-- ==============================================================================

-- 1. Ensure required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Create the profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    email TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Documentation comments
COMMENT ON TABLE public.profiles IS 'Stores application-level user profile details synced from Supabase Auth';
COMMENT ON COLUMN public.profiles.id IS 'Primary unique identifier (UUID)';
COMMENT ON COLUMN public.profiles.user_id IS 'References auth.users(id) - strictly 1 profile per user';
COMMENT ON COLUMN public.profiles.full_name IS 'Full display name synced from Google OAuth or user input';
COMMENT ON COLUMN public.profiles.avatar_url IS 'URL to the user avatar image';
COMMENT ON COLUMN public.profiles.email IS 'User primary email address';
COMMENT ON COLUMN public.profiles.created_at IS 'Timestamp when the profile was created';
COMMENT ON COLUMN public.profiles.updated_at IS 'Timestamp when the profile was last updated';

-- 3. Automatic updated_at trigger on public.profiles
DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 4. Create performance indexes
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);

-- 5. Automatic Profile Creation on auth.users INSERT
-- This function runs with SECURITY DEFINER privileges to create a profile row
-- whenever a new user signs up or signs in via Google OAuth.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, full_name, avatar_url, email)
    VALUES (
        NEW.id,
        COALESCE(
            NEW.raw_user_meta_data->>'full_name',
            NEW.raw_user_meta_data->>'name',
            ''
        ),
        COALESCE(
            NEW.raw_user_meta_data->>'avatar_url',
            NEW.raw_user_meta_data->>'picture',
            ''
        ),
        NEW.email
    )
    ON CONFLICT (user_id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        avatar_url = EXCLUDED.avatar_url,
        email = EXCLUDED.email,
        updated_at = now()
    WHERE public.profiles.full_name IS NULL OR public.profiles.full_name = '';

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger to auth.users (idempotent)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- 6. Enable Row Level Security (RLS) on public.profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies
-- Policy: Authenticated users can view ONLY their own profile
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Policy: Authenticated users can update ONLY their own profile
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
