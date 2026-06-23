import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Save, Edit2 } from 'lucide-react';
import { Card, Input, Button, Loading } from '../../components/ui';
import { useStore } from '../../stores';
import toast from 'react-hot-toast';

export function ProfilePage() {
  const { user } = useStore((state) => ({ user: state.user }));
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    country: '',
  });

  if (!user) return <Loading />;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Call API to update profile
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
            Profile Settings
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Manage your account information
          </p>
        </div>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="gap-2"
          >
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Avatar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-1">
              {user.name}
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400 mb-4">{user.email}</p>
            {isEditing && (
              <Button variant="outline" className="w-full gap-2 text-sm">
                Change Avatar
              </Button>
            )}
          </Card>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-900 dark:text-white mb-2">
                    Full Name
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                    icon={<User className="w-4 h-4" />}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-900 dark:text-white mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    icon={<Mail className="w-4 h-4" />}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-900 dark:text-white mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    icon={<Phone className="w-4 h-4" />}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-900 dark:text-white mb-2">
                    Address
                  </label>
                  <Input
                    placeholder="123 Main Street"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!isEditing}
                    icon={<MapPin className="w-4 h-4" />}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-900 dark:text-white mb-2">
                    City
                  </label>
                  <Input
                    placeholder="New York"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-900 dark:text-white mb-2">
                    Country
                  </label>
                  <Input
                    placeholder="United States"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-3 pt-4 border-t border-secondary-200 dark:border-secondary-700">
                  <Button
                    onClick={handleSave}
                    className="flex-1 gap-2"
                    isLoading={isSaving}
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Account Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-6">
            Account Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-secondary-200 dark:border-secondary-700">
              <div>
                <p className="font-medium text-secondary-900 dark:text-white">Email Notifications</p>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">Receive updates about your rewards</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-secondary-900 dark:text-white">Two-Factor Authentication</p>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">Add an extra layer of security</p>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
