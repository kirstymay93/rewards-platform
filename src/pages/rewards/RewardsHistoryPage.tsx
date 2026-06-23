import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, Filter } from 'lucide-react';
import { Card, Button, Badge, Input, Loading } from '../../components/ui';
import { rewardsService } from '../../services';

interface Transaction {
  id: string;
  type: 'earned' | 'redeemed';
  description: string;
  points: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export function RewardsHistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'earned' | 'redeemed'>('all');

  useEffect(() => {
    const loadHistory = async () => {
      try {
        // TODO: Fetch history from API
        setTransactions([
          {
            id: '1',
            type: 'earned',
            description: 'Purchase at Amazon',
            points: 500,
            date: '2024-06-20',
            status: 'completed'
          },
          {
            id: '2',
            type: 'redeemed',
            description: '$25 Starbucks Gift Card',
            points: 2500,
            date: '2024-06-19',
            status: 'completed'
          },
        ]);
      } catch (error) {
        console.error('Failed to load history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  if (isLoading) return <Loading />;

  const filtered = filterType === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === filterType);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            Rewards History
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Track all your points transactions
          </p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input
            placeholder="Search transactions..."
            className="flex-1"
          />
          <div className="flex gap-2">
            {(['all', 'earned', 'redeemed'] as const).map((type) => (
              <Button
                key={type}
                variant={filterType === type ? 'default' : 'outline'}
                size="sm"
                className="gap-2"
                onClick={() => setFilterType(type)}
              >
                <Filter className="w-4 h-4" />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-secondary-200 dark:border-secondary-700">
                <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-white">Description</th>
                <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-white">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-white">Points</th>
                <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-white">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((transaction, idx) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-secondary-200 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-800/50"
                >
                  <td className="py-3 px-4 font-medium text-secondary-900 dark:text-white">
                    {transaction.description}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={transaction.type === 'earned' ? 'success' : 'primary'}>
                      {transaction.type}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 font-semibold text-secondary-900 dark:text-white">
                    {transaction.type === 'earned' ? '+' : '-'}{transaction.points.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-secondary-600 dark:text-secondary-400">
                    {transaction.date}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        transaction.status === 'completed'
                          ? 'success'
                          : transaction.status === 'pending'
                          ? 'warning'
                          : 'error'
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
