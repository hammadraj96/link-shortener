import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isConfigured: boolean;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      // In initial setup without live credentials, resolve loading immediately
      setIsLoading(false);
      return;
    }

    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    }).catch((err) => {
      console.warn('Error fetching Supabase session:', err);
      setIsLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Architecture stub for Google OAuth login (to be fully hooked up in Auth Phase)
  const signInWithGoogle = async (): Promise<{ error: Error | null }> => {
    if (!isSupabaseConfigured) {
      return {
        error: new Error('Supabase is not configured. Please set your credentials in .env'),
      };
    }

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      return { error: error ? new Error(error.message) : null };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown auth error';
      return { error: new Error(message) };
    }
  };

  // Architecture stub for sign out
  const signOut = async (): Promise<{ error: Error | null }> => {
    if (!isSupabaseConfigured) {
      setUser(null);
      setSession(null);
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      return { error: error ? new Error(error.message) : null };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Sign out failed';
      return { error: new Error(message) };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isConfigured: isSupabaseConfigured,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
