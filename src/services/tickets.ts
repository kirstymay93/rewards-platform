import { supabase } from '../lib/supabase';

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export const ticketsService = {
  async getTickets(userId: string): Promise<SupportTicket[]> {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
      throw error;
    }
  },

  async getTicket(id: string): Promise<SupportTicket | null> {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to fetch ticket:', error);
      return null;
    }
  },

  async createTicket(
    userId: string,
    subject: string,
    description: string,
    priority: string
  ): Promise<SupportTicket> {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .insert([
          {
            user_id: userId,
            subject,
            description,
            priority,
            status: 'open',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Failed to create ticket:', error);
      throw error;
    }
  },

  async updateTicketStatus(id: string, status: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('support_tickets')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Failed to update ticket:', error);
      throw error;
    }
  },
};
