import { supabase } from './client';
import type { User, Session } from '@supabase/supabase-js';

export const authService = {
  // Get current user
  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  // Get current session
  async getCurrentSession(): Promise<Session | null> {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return {
      user: data.user,
      error: error?.message || null,
    };
  },

  // Sign up with email and password
  async signUp(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    return {
      user: data.user,
      error: error?.message || null,
    };
  },

  // Sign out
  async signOut(): Promise<{ error: string | null }> {
    const { error } = await supabase.auth.signOut();
    return { error: error?.message || null };
  },

  // Reset password
  async resetPassword(email: string): Promise<{ error: string | null }> {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    return { error: error?.message || null };
  },

  // Update password
  async updatePassword(password: string): Promise<{ error: string | null }> {
    const { error } = await supabase.auth.updateUser({
      password,
    });
    return { error: error?.message || null };
  },
}; 