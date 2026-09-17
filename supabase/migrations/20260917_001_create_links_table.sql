-- ==============================================================================
-- Migration: 20260917_001_create_links_table.sql
-- Description: Creates the public.links table, indexes, updated_at trigger, and RLS policies
-- Phase: 2 (Database Schema + RLS Foundation)
-- ==============================================================================

-- 1. Ensure required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Create the links table
CREATE TABLE IF NOT EXISTS public.links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    short_code TEXT UNIQUE,
    original_url TEXT NOT NULL,
    title TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    click_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Comments for documentation
COMMENT ON TABLE public.links IS 'Stores shortened URLs, metadata, ownership, and aggregated click counts';
COMMENT ON COLUMN public.links.id IS 'Primary unique identifier (UUID)';
COMMENT ON COLUMN public.links.user_id IS 'References auth.users(id) for authenticated user ownership (nullable in Phase 2)';
COMMENT ON COLUMN public.links.short_code IS 'Unique slug identifier used for short URL redirection';
COMMENT ON COLUMN public.links.original_url IS 'Full target destination URL';
COMMENT ON COLUMN public.links.title IS 'Custom label or campaign title provided by user';
COMMENT ON COLUMN public.links.is_active IS 'Flag indicating if the link is active and redirectable';
COMMENT ON COLUMN public.links.click_count IS 'Aggregated total clicks recorded for this link';
COMMENT ON COLUMN public.links.created_at IS 'Timestamp when the link record was created';
COMMENT ON COLUMN public.links.updated_at IS 'Timestamp when the link record was last modified';

-- 3. Automatic updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to public.links (idempotent)
DROP TRIGGER IF EXISTS set_links_updated_at ON public.links;
CREATE TRIGGER set_links_updated_at
BEFORE UPDATE ON public.links
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 4. Create performance indexes
CREATE INDEX IF NOT EXISTS idx_links_user_id ON public.links(user_id);
CREATE INDEX IF NOT EXISTS idx_links_created_at ON public.links(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_links_short_code ON public.links(short_code);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies
-- Policy: Authenticated users can view only their own links
DROP POLICY IF EXISTS "Users can view their own links" ON public.links;
CREATE POLICY "Users can view their own links"
ON public.links
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Policy: Authenticated users can insert their own links
DROP POLICY IF EXISTS "Users can insert their own links" ON public.links;
CREATE POLICY "Users can insert their own links"
ON public.links
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Policy: Authenticated users can update their own links
DROP POLICY IF EXISTS "Users can update their own links" ON public.links;
CREATE POLICY "Users can update their own links"
ON public.links
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Policy: Authenticated users can delete their own links
DROP POLICY IF EXISTS "Users can delete their own links" ON public.links;
CREATE POLICY "Users can delete their own links"
ON public.links
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
