import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Users,
  Gift,
  TrendingUp,
  Calendar,
  Download,
} from 'lucide-react';
import { Card, Button, Loading } from '../../components/ui';
import { useStore } from '../../stores';

interface DashboardStats {
  totalUsers: number;
  totalRewards: number;
  totalTransactions: number;
  monthlyGrowth: number;
}

export function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useStore((state) => ({ user: state.user }));

  useEffect(() => {
    // Load dashboard stats
    const loadStats = async () => {
      try {
        // TODO: Fetch from API
        setStats({
          totalUsers: 5000,
          totalRewards: 250000,
          totalTransactions: 15000,
          monthlyGrowth: 12.5,
        });
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
          Admin Dashboard
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400">Welcome back, {user?.email}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Users, label: 'Total Users', value: stats?.totalUsers, color: 'primary' },
          { icon: Gift, label: 'Total Rewards', value: stats?.totalRewards, color: 'accent' },
          { icon: TrendingUp, label: 'Transactions', value: stats?.totalTransactions, color: 'warning' },
          { icon: BarChart3, label: 'Monthly Growth', value: `${stats?.monthlyGrowth}%`, color: 'success' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-secondary-900 dark:text-white mt-2">
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">Revenue Trend</h3>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
          <div className="h-80 bg-secondary-50 dark:bg-secondary-800 rounded-lg flex items-center justify-center text-secondary-500 dark:text-secondary-400">
            <div className="text-center">
              <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Chart placeholder - integrate with chart library</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white">Recent Activity</h3>
            <Calendar className="w-5 h-5 text-secondary-400" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((_, idx) => (
              <div key={idx} className="flex items-center gap-3 pb-4 border-b border-secondary-200 dark:border-secondary-700 last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-primary-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-secondary-900 dark:text-white">User action #{idx + 1}</p>
                  <p className="text-xs text-secondary-500 dark:text-secondary-400">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
