import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { Card, Button, Input, Badge, Loading } from '../../components/ui';
import { ticketsService } from '../../services';

interface Ticket {
  id: string;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  messages: number;
}

export function MyTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadTickets = async () => {
      try {
        // TODO: Fetch from API
        setTickets([
          {
            id: '1',
            subject: 'Reward not showing up in my account',
            status: 'in-progress',
            priority: 'high',
            createdAt: '2024-06-20',
            updatedAt: '2024-06-21',
            messages: 3,
          },
          {
            id: '2',
            subject: 'Billing question',
            status: 'resolved',
            priority: 'low',
            createdAt: '2024-06-15',
            updatedAt: '2024-06-18',
            messages: 2,
          },
        ]);
      } catch (error) {
        console.error('Failed to load tickets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTickets();
  }, []);

  if (isLoading) return <Loading />;

  const filteredTickets = tickets.filter((t) =>
    t.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            My Support Tickets
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Track and manage your support requests
          </p>
        </div>
        <Link to="/support/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Ticket
          </Button>
        </Link>
      </div>

      <Card className="p-6">
        <Input
          placeholder="Search tickets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search className="w-4 h-4" />}
          className="mb-6"
        />

        <div className="space-y-3">
          {filteredTickets.map((ticket, idx) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link to={`/support/tickets/${ticket.id}`}>
                <div className="p-4 border border-secondary-200 dark:border-secondary-700 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800/50 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-secondary-900 dark:text-white mb-2">
                        {ticket.subject}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-secondary-500 dark:text-secondary-400">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {ticket.messages} messages
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Updated {ticket.updatedAt}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          ticket.priority === 'high'
                            ? 'error'
                            : ticket.priority === 'medium'
                            ? 'warning'
                            : 'secondary'
                        }
                      >
                        {ticket.priority}
                      </Badge>
                      <Badge
                        variant={
                          ticket.status === 'resolved'
                            ? 'success'
                            : ticket.status === 'in-progress'
                            ? 'warning'
                            : 'error'
                        }
                      >
                        {ticket.status === 'resolved' ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            {ticket.status}
                          </span>
                        ) : (
                          ticket.status
                        )}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
