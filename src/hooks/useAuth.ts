import { useEffect, useState } from 'react';
import { useStore } from '../stores';
import { authService } from '../services';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser, setIsAuthenticated } = useStore((state) => ({
    user: state.user,
    setUser: state.setUser,
    setIsAuthenticated: state.setIsAuthenticated,
  }));

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [setUser, setIsAuthenticated]);

  return { user, isLoading };
}
