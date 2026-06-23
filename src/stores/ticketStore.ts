import { create } from 'zustand';

interface Ticket {
  id: string;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

interface TicketState {
  tickets: Ticket[];
  selectedTicket: Ticket | null;
  setTickets: (tickets: Ticket[]) => void;
  setSelectedTicket: (ticket: Ticket | null) => void;
  addTicket: (ticket: Ticket) => void;
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
}

export const useTicketStore = create<TicketState>((set) => ({
  tickets: [],
  selectedTicket: null,
  setTickets: (tickets) => set({ tickets }),
  setSelectedTicket: (ticket) => set({ selectedTicket: ticket }),
  addTicket: (ticket) =>
    set((state) => ({
      tickets: [ticket, ...state.tickets],
    })),
  updateTicket: (id, updates) =>
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    })),
}));
