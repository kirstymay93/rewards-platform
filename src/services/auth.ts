import { supabase } from '../lib/supabase';
import type { User } from '../types';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  points: number;
  createdAt: string;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthUser> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (!data.user) throw new Error('Login failed');

      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;

      return {
        id: data.user.id,
        email: data.user.email || '',
        name: profile.name || '',
        points: profile.points || 0,
        createdAt: profile.created_at,
      };
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  async register(name: string, email: string, password: string): Promise<AuthUser> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      if (!data.user) throw new Error('Registration failed');

      // Create user profile
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: data.user.id,
            email: data.user.email,
            name,
            points: 100, // Signup bonus
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (profileError) throw profileError;

      return {
        id: data.user.id,
        email: data.user.email || '',
        name,
        points: 100,
        createdAt: profile.created_at,
      };
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) return null;

      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      return {
        id: user.id,
        email: user.email || '',
        name: profile.name || '',
        points: profile.points || 0,
        createdAt: profile.created_at,
      };
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  },
};
