import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, Input, Button, Badge, Loading } from '../../components/ui';
import { ticketsService } from '../../services';
import toast from 'react-hot-toast';

interface TicketDetail {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  messages: Array<{ id: string; author: string; content: string; createdAt: string; isStaff: boolean }>;
}

export function TicketDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const loadTicket = async () => {
      try {
        // TODO: Fetch from API
        setTicket({
          id: id || '1',
          subject: 'Reward not showing up in my account',
          description: 'I earned 500 points from a purchase but they haven\'t appeared in my account yet.',
          status: 'in-progress',
          priority: 'high',
          createdAt: '2024-06-20',
          messages: [
            {
              id: '1',
              author: 'You',
              content: 'I earned 500 points from a purchase but they haven\'t appeared in my account yet.',
              createdAt: '2024-06-20 10:00',
              isStaff: false,
            },
            {
              id: '2',
              author: 'Support Team',
              content: 'Thank you for contacting us. We\'re investigating your order. Can you please provide your order number?',
              createdAt: '2024-06-20 11:30',
              isStaff: true,
            },
          ],
        });
      } catch (error) {
        toast.error('Failed to load ticket');
      } finally {
        setIsLoading(false);
      }
    };

    loadTicket();
  }, [id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    setIsSending(true);
    try {
      // TODO: Send message via API
      setMessageText('');
      toast.success('Message sent!');
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) return <Loading />;
  if (!ticket) return <div>Ticket not found</div>;

  return (
    <div className="space-y-6">
      <Link
        to="/support/my-tickets"
        className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to My Tickets
      </Link>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            {ticket.subject}
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">Ticket #{ticket.id}</p>
        </div>
        <div className="flex gap-2">
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
              ticket.status === 'resolved' ? 'success' : ticket.status === 'in-progress' ? 'warning' : 'error'
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

      {/* Ticket Info */}
      <Card className="p-6 bg-secondary-50 dark:bg-secondary-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-secondary-600 dark:text-secondary-400">
            <Clock className="w-4 h-4" />
            Created on {ticket.createdAt}
          </div>
          {ticket.status !== 'resolved' && (
            <Button variant="outline" size="sm">
              Close Ticket
            </Button>
          )}
        </div>
      </Card>

      {/* Messages */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-6">Conversation</h3>
        <div className="space-y-6 mb-6 max-h-96 overflow-y-auto">
          {ticket.messages.map((message, idx) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`flex ${message.isStaff ? '' : 'justify-end'}`}
            >
              <div
                className={`max-w-md p-4 rounded-lg ${
                  message.isStaff
                    ? 'bg-secondary-100 dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100'
                    : 'bg-primary-500 text-white'
                }`}
              >
                <div className={`text-xs font-medium mb-1 ${message.isStaff ? 'text-secondary-600 dark:text-secondary-400' : 'text-primary-100'}`}>
                  {message.author} • {message.createdAt}
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="flex gap-3 border-t border-secondary-200 dark:border-secondary-700 pt-6">
          <Input
            placeholder="Type your message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            disabled={ticket.status === 'resolved'}
          />
          <Button
            type="submit"
            className="gap-2"
            isLoading={isSending}
            disabled={ticket.status === 'resolved' || !messageText.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </Card>
    </div>
  );
}
