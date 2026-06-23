import { supabase } from '../lib/supabase';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  points: number;
  tier: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  createdAt: string;
}

export const usersService = {
  async getUser(id: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      return null;
    }
  },

  async updateUser(id: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    }
  },

  async addPoints(userId: string, points: number, reason: string): Promise<void> {
    try {
      // Get current points
      const { data: user, error: fetchError } = await supabase
        .from('users')
        .select('points')
        .eq('id', userId)
        .single();

      if (fetchError) throw fetchError;

      // Update points
      const newPoints = (user?.points || 0) + points;
      const { error: updateError } = await supabase
        .from('users')
        .update({ points: newPoints })
        .eq('id', userId);

      if (updateError) throw updateError;

      // Log activity
      await supabase
        .from('activities')
        .insert([
          {
            user_id: userId,
            type: 'points',
            description: reason,
            points,
            created_at: new Date().toISOString(),
          },
        ]);
    } catch (error) {
      console.error('Failed to add points:', error);
      throw error;
    }
  },
};
