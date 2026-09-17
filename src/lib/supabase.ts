import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SupabaseConfigStatus } from '@/types';
import { Database } from '@/types/database';

// Retrieve environment variables (supporting both PUBLISHABLE_KEY and ANON_KEY)
const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  '';

// Normalize URL (if given project ref ID without http/https, prefix standard supabase domain)
const formatSupabaseUrl = (url: string): string => {
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}.supabase.co`;
};

const supabaseUrl = formatSupabaseUrl(rawUrl);
const isConfigured = Boolean(supabaseUrl && supabaseKey);

/**
 * Diagnostic helper to safely check Supabase configuration state
 * without exposing secret keys.
 */
export function getSupabaseConfigStatus(): SupabaseConfigStatus {
  const urlPresent = Boolean(supabaseUrl && supabaseUrl.startsWith('https://'));
  const keyPresent = Boolean(supabaseKey && supabaseKey.length > 5);

  let message = 'Supabase client ready';
  if (!urlPresent && !keyPresent) {
    message = 'Missing VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in .env.local';
  } else if (!urlPresent) {
    message = 'Missing or invalid VITE_SUPABASE_URL';
  } else if (!keyPresent) {
    message = 'Missing VITE_SUPABASE_PUBLISHABLE_KEY';
  }

  return {
    isConfigured: urlPresent && keyPresent,
    urlPresent,
    anonKeyPresent: keyPresent,
    message,
  };
}

/**
 * Initialize centralized Supabase Client with full TypeScript Database definitions.
 * If credentials are missing in development, a safe fallback client is initialized.
 */
function initializeSupabaseClient(): SupabaseClient<Database> {
  const status = getSupabaseConfigStatus();

  if (!status.isConfigured) {
    if (import.meta.env.DEV) {
      console.warn(
        `[Supabase Dev Warning]: ${status.message}. Please configure .env.local with valid credentials.`
      );
    }
    // Fallback placeholder client to prevent unhandled runtime exceptions during UI preview
    return createClient<Database>(
      supabaseUrl || 'https://placeholder.supabase.co',
      supabaseKey || 'placeholder-publishable-key',
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );
  }

  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

export const supabase = initializeSupabaseClient();
export const isSupabaseConfigured = isConfigured;
