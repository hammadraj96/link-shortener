import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { UserProfile } from '@/types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isConfigured: boolean;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
  updateProfile: (updates: { full_name?: string; avatar_url?: string }) => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch or construct profile for an active user
  const fetchProfile = useCallback(async (activeUser: User | null) => {
    if (!activeUser || !isSupabaseConfigured) {
      setProfile(null);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', activeUser.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.warn('[Auth] Error fetching user profile from database:', error.message);
      }

      if (data) {
        setProfile(data as UserProfile);
      } else {
        // Fallback profile derived from auth user metadata if database table is not yet migrated
        const metadata = activeUser.user_metadata || {};
        setProfile({
          id: activeUser.id,
          user_id: activeUser.id,
          email: activeUser.email || null,
          full_name: metadata.full_name || metadata.name || null,
          avatar_url: metadata.avatar_url || metadata.picture || null,
          created_at: activeUser.created_at,
        });
      }
    } catch (err) {
      console.warn('[Auth] Exception while retrieving profile:', err);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (!isSupabaseConfigured) {
      setIsLoading(false);
      return;
    }

    // 1. Check existing session on load
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (!isMounted) return;
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user).finally(() => {
            if (isMounted) setIsLoading(false);
          });
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.warn('[Auth] Error checking initial session:', err);
        if (isMounted) setIsLoading(false);
      });

    // 2. Listen to real-time auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (!isMounted) return;
      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (newSession?.user) {
        await fetchProfile(newSession.user);
      } else {
        setProfile(null);
      }

      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  // Initiate Google OAuth login
  const signInWithGoogle = async (): Promise<{ error: Error | null }> => {
    if (!isSupabaseConfigured) {
      return {
        error: new Error('Supabase is not configured in .env.local'),
      };
    }

    try {
      const redirectUrl = `${window.location.origin}/dashboard`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        return { error: new Error(error.message) };
      }
      return { error: null };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Google sign-in initiation failed';
      return { error: new Error(message) };
    }
  };

  // Sign out and clear local session state
  const signOut = async (): Promise<{ error: Error | null }> => {
    if (!isSupabaseConfigured) {
      setUser(null);
      setSession(null);
      setProfile(null);
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
      if (error) {
        return { error: new Error(error.message) };
      }
      return { error: null };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Sign out failed';
      return { error: new Error(message) };
    }
  };

  // Update authenticated user profile
  const updateProfile = async (updates: {
    full_name?: string;
    avatar_url?: string;
  }): Promise<{ error: Error | null }> => {
    if (!user) {
      return { error: new Error('No authenticated user session found') };
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        // Also update Supabase auth user metadata as backup
        await supabase.auth.updateUser({
          data: updates,
        });
        // Optimistically update local profile state
        setProfile((prev) => (prev ? { ...prev, ...updates } : null));
        return { error: new Error(error.message) };
      }

      if (data) {
        setProfile(data as UserProfile);
      }
      return { error: null };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Profile update failed';
      return { error: new Error(message) };
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        isConfigured: isSupabaseConfigured,
        signInWithGoogle,
        signOut,
        updateProfile,
        refreshProfile,
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
