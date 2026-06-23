import { useAuthStore } from './authStore';
import { useNotificationStore } from './notificationStore';
import { useRewardsStore } from './rewardsStore';
import { useThemeStore } from './themeStore';
import { useTicketStore } from './ticketStore';

export const useStore = (selector: (state: any) => any) => {
  // Return the appropriate store based on the selector
  // This is a simple implementation - in production, you might use a more sophisticated approach
  const auth = useAuthStore();
  const notifications = useNotificationStore();
  const rewards = useRewardsStore();
  const theme = useThemeStore();
  const tickets = useTicketStore();

  return selector({
    // Auth
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    setUser: auth.setUser,
    setIsAuthenticated: auth.setIsAuthenticated,
    // Notifications
    notifications: notifications.notifications,
    addNotification: notifications.addNotification,
    // Rewards
    rewards: rewards.rewards,
    favorites: rewards.favorites,
    // Theme
    theme: theme.theme,
    toggleTheme: theme.toggleTheme,
    // Tickets
    tickets: tickets.tickets,
    setSelectedTicket: tickets.setSelectedTicket,
  });
};

export { useAuthStore } from './authStore';
export { useNotificationStore } from './notificationStore';
export { useRewardsStore } from './rewardsStore';
export { useThemeStore } from './themeStore';
export { useTicketStore } from './ticketStore';
