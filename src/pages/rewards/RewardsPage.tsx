import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Heart, Star, TrendingUp } from 'lucide-react';
import { Card, Button, Input, Badge, Loading, EmptyState } from '../../components/ui';
import { rewardsService } from '../../services';
import { useStore } from '../../stores';

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  image: string;
  rating: number;
  category: string;
  available: number;
}

export function RewardsPage() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const { user } = useStore((state) => ({ user: state.user }));

  const categories = ['all', 'gift-cards', 'experiences', 'merchandise'];

  useEffect(() => {
    const loadRewards = async () => {
      try {
        // TODO: Fetch from API
        setRewards([
          {
            id: '1',
            title: '$50 Amazon Gift Card',
            description: 'Use towards any purchase',
            points: 5000,
            image: 'https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=300',
            rating: 4.8,
            category: 'gift-cards',
            available: 150,
          },
          {
            id: '2',
            title: '$25 Starbucks Card',
            description: 'Enjoy your favorite drinks',
            points: 2500,
            image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300',
            rating: 4.6,
            category: 'gift-cards',
            available: 200,
          },
        ]);
      } catch (error) {
        console.error('Failed to load rewards:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRewards();
  }, []);

  if (isLoading) return <Loading />;

  const filteredRewards = rewards.filter(
    (reward) =>
      (selectedCategory === 'all' || reward.category === selectedCategory) &&
      reward.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedRewards = [...filteredRewards].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.points - b.points;
      case 'price-high':
        return b.points - a.points;
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.available - a.available;
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">Discover Rewards</h1>
        <p className="text-secondary-600 dark:text-secondary-400">You have {user?.points || 0} points available</p>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <Input
            placeholder="Search rewards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Points: Low to High</option>
            <option value="price-high">Points: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </Card>

      {/* Rewards Grid */}
      {sortedRewards.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRewards.map((reward, idx) => (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all h-full flex flex-col">
                <div className="relative overflow-hidden h-48">
                  <img
                    src={reward.image}
                    alt={reward.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4">{reward.category}</Badge>
                  <button className="absolute top-4 right-4 p-2 rounded-lg bg-white/80 dark:bg-secondary-800/80 hover:bg-white dark:hover:bg-secondary-800 transition-colors">
                    <Heart className="w-5 h-5 text-secondary-400" />
                  </button>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-1 line-clamp-1">
                    {reward.title}
                  </h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-4 line-clamp-2">
                    {reward.description}
                  </p>

                  <div className="flex items-center gap-1 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(reward.rating)
                              ? 'fill-warning-400 text-warning-400'
                              : 'text-secondary-300 dark:text-secondary-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-secondary-500 ml-1">{reward.rating}</span>
                  </div>

                  <div className="mt-auto space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary-600 dark:text-secondary-400">Available: {reward.available}</span>
                      <span className="text-lg font-bold text-primary-600 dark:text-primary-400 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {reward.points.toLocaleString()}
                      </span>
                    </span>
                    </div>
                    <Link to={`/rewards/${reward.id}`}>
                      <Button className="w-full" size="sm">View Details</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Filter}
          title="No rewards found"
          description="Try adjusting your filters or search term"
        />
      )}
    </div>
  );
}
