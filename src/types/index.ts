export interface User {
  id: string;
  email: string;
  name: string;
  points: number;
  tier?: string;
  avatar?: string;
  createdAt: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  category: string;
  image: string;
  rating: number;
  available: number;
}

export interface Transaction {
  id: string;
  type: 'earned' | 'redeemed';
  description: string;
  points: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  points: number;
  date: string;
}
