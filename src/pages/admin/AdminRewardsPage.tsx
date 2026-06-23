import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { Card, Button, Input, Modal } from '../../components/ui';
import { useStore } from '../../stores';

interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  category: string;
  status: 'active' | 'inactive';
}

export function AdminRewardsPage() {
  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: '1',
      name: '$50 Amazon Gift Card',
      description: 'Redeem for Amazon purchases',
      pointsCost: 5000,
      category: 'gift-cards',
      status: 'active',
    },
    {
      id: '2',
      name: '$25 Starbucks Card',
      description: 'Use at any Starbucks location',
      pointsCost: 2500,
      category: 'gift-cards',
      status: 'active',
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useStore((state) => ({ user: state.user }));

  const filteredRewards = rewards.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">Manage Rewards</h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Create and manage available rewards
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          New Reward
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Search rewards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="w-4 h-4" />}
            className="flex-1"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-secondary-200 dark:border-secondary-700">
                <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-white">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-white">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-white">Points Cost</th>
                <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-white">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRewards.map((reward, idx) => (
                <motion.tr
                  key={reward.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-secondary-200 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-800/50"
                >
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-secondary-900 dark:text-white">{reward.name}</p>
                      <p className="text-sm text-secondary-500 dark:text-secondary-400">{reward.description}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-secondary-600 dark:text-secondary-400">{reward.category}</td>
                  <td className="py-3 px-4 font-medium text-secondary-900 dark:text-white">              {reward.pointsCost.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        reward.status === 'active'
                          ? 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-400'
                          : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300'
                      }`}
                    >
                      {reward.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1 text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-900/20">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Reward"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          setIsModalOpen(false);
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-900 dark:text-white mb-1">
              Reward Name
            </label>
            <Input placeholder="e.g., $50 Amazon Gift Card" />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary-900 dark:text-white mb-1">
              Points Cost
            </label>
            <Input type="number" placeholder="5000" />
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">Create Reward</Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
