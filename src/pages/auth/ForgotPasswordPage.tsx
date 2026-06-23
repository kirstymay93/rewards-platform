import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Check } from 'lucide-react';
import { Input, Button, Card } from '../../components/ui';
import { authService } from '../../services';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // TODO: Implement password reset
      setIsSubmitted(true);
    } catch (error) {
      console.error('Password reset failed:', error);
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
        <Card className="p-8">
          {isSubmitted ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 text-accent-600 dark:text-accent-400" />
              </div>
              <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
                Check your email
              </h1>
              <p className="text-secondary-600 dark:text-secondary-400">
                We\'ve sent a password reset link to {email}. Check your email and follow the instructions.
              </p>
              <Link to="/login">
                <Button className="w-full gap-2 mt-6">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
                  Reset Password
                </h1>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Enter your email and we\'ll send you a link to reset your password.
                </p>
              </div>

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

              <Button type="submit" className="w-full" isLoading={isLoading}>
                Send Reset Link
              </Button>

              <div className="text-center">
                <Link to="/login" className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium flex items-center justify-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
