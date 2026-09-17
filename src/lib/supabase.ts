import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SupabaseConfigStatus } from '@/types';

// Retrieve environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * Diagnostic helper to safely check Supabase configuration state
 * without exposing secret keys.
 */
export function getSupabaseConfigStatus(): SupabaseConfigStatus {
  const urlPresent = Boolean(supabaseUrl && supabaseUrl.startsWith('http'));
  const anonKeyPresent = Boolean(supabaseAnonKey && supabaseAnonKey.length > 10);

  let message = 'Supabase client ready';
  if (!urlPresent && !anonKeyPresent) {
    message = 'Missing VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env';
  } else if (!urlPresent) {
    message = 'Missing or invalid VITE_SUPABASE_URL';
  } else if (!anonKeyPresent) {
    message = 'Missing VITE_SUPABASE_ANON_KEY';
  }

  return {
    isConfigured: urlPresent && anonKeyPresent,
    urlPresent,
    anonKeyPresent,
    message,
  };
}

/**
 * Initialize centralized Supabase Client.
 * If credentials are missing in development, a dummy placeholder client is returned
 * with non-crashing fallbacks and console diagnostics to keep the app operational.
 */
function initializeSupabaseClient(): SupabaseClient {
  const status = getSupabaseConfigStatus();

  if (!status.isConfigured) {
    if (import.meta.env.DEV) {
      console.warn(
        `[Supabase Dev Warning]: ${status.message}. Please configure .env with valid credentials for authentication and database features.`
      );
    }
    // Safe initialization with dummy values to prevent runtime crashes during initial UI setup
    return createClient(
      supabaseUrl || 'https://placeholder.supabase.co',
      supabaseAnonKey || 'placeholder-anon-key',
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

export const supabase = initializeSupabaseClient();
export const isSupabaseConfigured = isConfigured;
