import { supabase } from '../lib/supabase';

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  category: string;
  image: string;
  status: 'active' | 'inactive';
}

export interface RewardTransaction {
  id: string;
  userId: string;
  rewardId: string;
  type: 'earned' | 'redeemed';
  points: number;
  createdAt: string;
}

export const rewardsService = {
  async getRewards(): Promise<Reward[]> {
    try {
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .eq('status', 'active')
        .order('name');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to fetch rewards:', error);
      throw error;
    }
  },

  async getRewardById(id: string): Promise<Reward | null> {
    try {
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to fetch reward:', error);
      return null;
    }
  },

  async getUserStats() {
    return {
      points: 12500,
      tier: 'Gold',
      nextTierAt: 15000,
      recentTransactions: [
        {
          id: '1',
          description: 'Purchase at Amazon',
          points: 500,
          date: '2024-06-20',
        },
      ],
    };
  },

  async redeemReward(userId: string, rewardId: string): Promise<RewardTransaction> {
    try {
      // Create transaction
      const { data, error } = await supabase
        .from('reward_transactions')
        .insert([
          {
            user_id: userId,
            reward_id: rewardId,
            type: 'redeemed',
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to redeem reward:', error);
      throw error;
    }
  },
};
