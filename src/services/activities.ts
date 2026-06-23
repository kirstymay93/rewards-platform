import { supabase } from '../lib/supabase';

export interface Activity {
  id: string;
  userId: string;
  type: string;
  description: string;
  points: number;
  createdAt: string;
}

export const activitiesService = {
  async getActivities(userId: string): Promise<Activity[]> {
    try {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to fetch activities:', error);
      throw error;
    }
  },

  async createActivity(
    userId: string,
    type: string,
    description: string,
    points: number
  ): Promise<Activity> {
    try {
      const { data, error } = await supabase
        .from('activities')
        .insert([
          {
            user_id: userId,
            type,
            description,
            points,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to create activity:', error);
      throw error;
    }
  },
};
