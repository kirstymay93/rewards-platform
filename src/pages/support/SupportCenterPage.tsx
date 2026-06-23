import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HelpCircle, MessageCircle, Search, ChevronRight } from 'lucide-react';
import { Card, Button, Input, Loading } from '../../components/ui';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export function SupportCenterPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // TODO: Fetch FAQs from API
    setFaqs([
      {
        id: '1',
        question: 'How do I earn points?',
        answer: 'You earn points on every purchase. Each dollar spent equals one point. You also get bonus points during special promotions.',
        category: 'rewards',
      },
      {
        id: '2',
        question: 'How do I redeem my points?',
        answer: 'Go to the Rewards section, browse available rewards, and click "Redeem Now" when you find something you like.',
        category: 'rewards',
      },
      {
        id: '3',
        question: 'Do my points expire?',
        answer: 'No, your points do not expire as long as your account is active. Inactive accounts may have points expire after 24 months.',
        category: 'rewards',
      },
    ]);
    setIsLoading(false);
  }, []);

  if (isLoading) return <Loading />;

  const categories = ['all', 'rewards', 'account', 'technical', 'billing'];
  const filteredFaqs = faqs.filter(
    (faq) =>
      (selectedCategory === 'all' || faq.category === selectedCategory) &&
      faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
          Support Center
        </h1>
        <p className="text-lg text-secondary-600 dark:text-secondary-400 mb-6">
          Find answers to common questions and get help
        </p>
      </motion.div>

      {/* Quick Links */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: HelpCircle, title: 'FAQs', description: 'Common questions' },
          { icon: MessageCircle, title: 'Contact Us', description: 'Get in touch' },
          { icon: Search, title: 'Documentation', description: 'Learn more' },
          { icon: ChevronRight, title: 'Status', description: 'System status' },
        ].map((link, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30 w-fit mx-auto mb-3">
                <link.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="font-semibold text-secondary-900 dark:text-white mb-1">
                {link.title}
              </h3>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                {link.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search and Filter */}
      <Card className="p-6">
        <Input
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search className="w-4 h-4" />}
          className="mb-4"
        />

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                selectedCategory === cat
                  ? 'bg-primary-500 text-white'
                  : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Card>

      {/* FAQs */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, idx) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <details className="cursor-pointer">
                <summary className="font-semibold text-secondary-900 dark:text-white flex items-center justify-between">
                  {faq.question}
                  <ChevronRight className="w-5 h-5 text-secondary-400 transition-transform" />
                </summary>
                <p className="mt-4 text-secondary-600 dark:text-secondary-400">{faq.answer}</p>
              </details>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-8 bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Didn\'t find what you\'re looking for?</h2>
          <p className="text-primary-100 mb-6">
            Our support team is here to help you with any questions.
          </p>
          <Link to="/support/new">
            <Button variant="secondary" className="gap-2">
              <MessageCircle className="w-4 h-4" />
              Create a Support Ticket
            </Button>
          </Link>
        </Card>
      </motion.div>
    </div>
  );
}
