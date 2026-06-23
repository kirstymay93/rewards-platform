import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Gift,
  History,
  AlertCircle,
  Award,
  ArrowRight,
} from 'lucide-react';
import { Card, Button, Loading, EmptyState } from '../../components/ui';
import { useStore } from '../../stores';
import { rewardsService } from '../../services';
import { Link } from 'react-router-dom';

interface UserStats {
  points: number;
  tier: string;
  nextTierAt: number;
  recentTransactions: Array<{ id: string; description: string; points: number; date: string }>;
}

export function DashboardPage() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useStore((state) => ({ user: state.user }));

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await rewardsService.getUserStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          You\'re earning rewards with every action
        </p>
      </div>

      {/* Points Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-8 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 text-white">
          <div className="space-y-6">
            <div>
              <p className="text-primary-100 mb-2">Your Points Balance</p>
              <h2 className="text-5xl font-bold">{stats?.points.toLocaleString()}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-primary-100 text-sm mb-1">Current Tier</p>
                <p className="text-2xl font-semibold">{stats?.tier}</p>
              </div>
              <div className="text-right">
                <p className="text-primary-100 text-sm mb-1">Next Tier At</p>
                <p className="text-2xl font-semibold">{stats?.nextTierAt.toLocaleString()}</p>
              </div>
            </div>
            <Link to="/rewards">
              <Button variant="secondary" className="w-full gap-2">
                Explore Rewards
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-3 gap-6">
        {[
          { icon: TrendingUp, label: 'Points Earned', value: '2,500' },
          { icon: Gift, label: 'Rewards Redeemed', value: '5' },
          { icon: Award, label: 'Achievements', value: '12' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                  <stat.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-secondary-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white flex items-center gap-2">
              <History className="w-5 h-5 text-primary-600" />
              Recent Activity
            </h3>
            <Link to="/rewards/history">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>

          {stats?.recentTransactions && stats.recentTransactions.length > 0 ? (
            <div className="space-y-4">
              {stats.recentTransactions.slice(0, 5).map((transaction, idx) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between py-3 border-b border-secondary-200 dark:border-secondary-700 last:border-0"
                >
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-white">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400">
                      {transaction.date}
                    </p>
                  </div>
                  <span className="text-lg font-semibold text-accent-600 dark:text-accent-400">
                    +{transaction.points}
                  </span>
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={AlertCircle}
              title="No activity yet"
              description="Start earning points by making purchases"
            />
          )}
        </Card>
      </motion.div>
    </div>
  );
}
