import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Edit2, Trash2, Shield, User } from 'lucide-react';
import { Card, Button, Input, Badge } from '../../components/ui';
import { useStore } from '../../stores';

interface User {
  id: string;
  email: string;
  points: number;
  role: 'user' | 'admin';
  joinedAt: string;
  status: 'active' | 'inactive';
}

export function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      email: 'john@example.com',
      points: 5000,
      role: 'user',
      joinedAt: '2024-01-15',
      status: 'active',
    },
    {
      id: '2',
      email: 'jane@example.com',
      points: 8500,
      role: 'user',
      joinedAt: '2024-02-20',
      status: 'active',
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useStore((state) => ({ user: state.user }));

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">User Management</h1>
        <p className="text-secondary-600 dark:text-secondary-400">Manage platform users and their permissions</p>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Search users..."
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
                <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-white">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-white">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-white">Points</th>
                <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-white">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-white">Joined</th>
                <th className="text-left py-3 px-4 font-semibold text-secondary-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-secondary-200 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-800/50"
                >
                  <td className="py-3 px-4 font-medium text-secondary-900 dark:text-white">{user.email}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {user.role === 'admin' && <Shield className="w-4 h-4 text-primary-600" />}
                      {user.role === 'user' && <User className="w-4 h-4 text-secondary-400" />}
                      <span className="text-secondary-600 dark:text-secondary-400 capitalize">{user.role}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-secondary-600 dark:text-secondary-400">
                    {user.points.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-secondary-600 dark:text-secondary-400">{user.joinedAt}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-900/20">
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
    </div>
  );
}
