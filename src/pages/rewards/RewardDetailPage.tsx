import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Share2, Heart } from 'lucide-react';
import { Card, Button, Badge, Loading } from '../../components/ui';
import { useState, useEffect } from 'react';
import { rewardsService } from '../../services';
import toast from 'react-hot-toast';

interface RewardDetail {
  id: string;
  title: string;
  description: string;
  points: number;
  image: string;
  rating: number;
  category: string;
  available: number;
  terms: string[];
}

export function RewardDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [reward, setReward] = useState<RewardDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadReward = async () => {
      try {
        // TODO: Fetch reward details from API
        setReward({
          id: id || '1',
          title: '$50 Amazon Gift Card',
          description: 'Use towards any purchase on Amazon.com',
          points: 5000,
          image: 'https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=600',
          rating: 4.8,
          category: 'gift-cards',
          available: 150,
          terms: ['No expiration date', 'Can be used online or in-store', 'Not transferable']
        });
      } catch (error) {
        toast.error('Failed to load reward');
      } finally {
        setIsLoading(false);
      }
    };

    loadReward();
  }, [id]);

  if (isLoading) return <Loading />;
  if (!reward) return <div>Reward not found</div>;

  return (
    <div className="space-y-6">
      <Link to="/rewards" className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline">
        <ArrowLeft className="w-4 h-4" />
        Back to Rewards
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <Card className="overflow-hidden">
            <img
              src={reward.image}
              alt={reward.title}
              className="w-full h-96 object-cover"
            />
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <Badge className="mb-4">{reward.category}</Badge>
                  <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
                    {reward.title}
                  </h1>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(reward.rating)
                              ? 'fill-warning-400 text-warning-400'
                              : 'text-secondary-300 dark:text-secondary-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-secondary-600 dark:text-secondary-400">
                      {reward.rating} ({150} reviews)
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-2 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-lg transition-colors"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isFavorite
                        ? 'fill-error-500 text-error-500'
                        : 'text-secondary-400'
                    }`}
                  />
                </button>
              </div>

              <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-8">
                {reward.description}
              </p>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">
                  Terms & Conditions
                </h3>
                <ul className="space-y-2">
                  {reward.terms.map((term, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-secondary-600 dark:text-secondary-400">
                      <span className="text-primary-500 mt-1">✓</span>
                      {term}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 sticky top-6">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-2">Points Required</p>
                <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                  {reward.points.toLocaleString()}
                </p>
              </div>

              <div className="pt-6 border-t border-secondary-200 dark:border-secondary-700">
                <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-2">Available Quantity</p>
                <p className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                  {reward.available} in stock
                </p>
                <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
                  <div
                    className="bg-accent-500 h-2 rounded-full"
                    style={{ width: `${(reward.available / 200) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full">Redeem Now</Button>
                <Button variant="outline" className="w-full gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
