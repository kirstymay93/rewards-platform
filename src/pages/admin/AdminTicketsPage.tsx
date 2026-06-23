import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, Button, Input, Badge } from '../../components/ui';
import { useStore } from '../../stores';

interface Ticket {
  id: string;
  userId: string;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export function AdminTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: '1',
      userId: 'user1',
      subject: 'Reward not showing up',
      status: 'open',
      priority: 'high',
      createdAt: '2024-06-20',
    },
    {
      id: '2',
      userId: 'user2',
      subject: 'Payment issue',
      status: 'in-progress',
      priority: 'high',
      createdAt: '2024-06-19',
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useStore((state) => ({ user: state.user }));

  const filteredTickets = tickets.filter(
    (t) =>
      t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'error';
      case 'in-progress':
        return 'warning';
      case 'resolved':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">Support Tickets</h1>
        <p className="text-secondary-600 dark:text-secondary-400">Manage customer support tickets</p>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="w-4 h-4" />}
            className="flex-1"
          />
        </div>

        <div className="space-y-4">
          {filteredTickets.map((ticket, idx) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-4 border border-secondary-200 dark:border-secondary-700 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800/50 cursor-pointer transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-2 rounded-lg bg-${getStatusColor(ticket.status)}-100 dark:bg-${getStatusColor(ticket.status)}-900/30 mt-1`}>
                    {ticket.status === 'resolved' ? (
                      <CheckCircle className={`w-5 h-5 text-${getStatusColor(ticket.status)}-600`} />
                    ) : (
                      <AlertCircle className={`w-5 h-5 text-${getStatusColor(ticket.status)}-600`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-secondary-900 dark:text-white">{ticket.subject}</p>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400">
                      From {ticket.userId} • {ticket.createdAt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={ticket.priority === 'high' ? 'error' : ticket.priority === 'medium' ? 'warning' : 'secondary'}
                  >
                    {ticket.priority}
                  </Badge>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
