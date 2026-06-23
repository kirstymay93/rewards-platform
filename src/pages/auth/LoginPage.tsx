import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import { Input, Button, Card } from '../../components/ui';
import { useStore } from '../../stores';
import { authService } from '../../services';
import toast from 'react-hot-toast';

export function LoginPage() {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useStore((state) => ({
    setUser: state.setUser,
    setIsAuthenticated: state.setIsAuthenticated,
  }));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await authService.login(email, password);
      setUser(user);
      setIsAuthenticated(true);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Sign in to your RewardsHub account
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-secondary-900 dark:text-white mb-2">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-4 h-4" />}
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-secondary-900 dark:text-white">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-4 h-4" />}
                required
              />
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-secondary-200 dark:border-secondary-700 text-center">
            <p className="text-secondary-600 dark:text-secondary-400 text-sm">
              Don\'t have an account?{' '}
              <Link
                to="/register"
                className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
