import { create } from 'zustand';

interface Reward {
  id: string;
  title: string;
  points: number;
  category: string;
  available: number;
}

interface RewardsState {
  rewards: Reward[];
  favorites: string[];
  setRewards: (rewards: Reward[]) => void;
  addFavorite: (rewardId: string) => void;
  removeFavorite: (rewardId: string) => void;
  isFavorite: (rewardId: string) => boolean;
}

export const useRewardsStore = create<RewardsState>((set, get) => ({
  rewards: [],
  favorites: [],
  setRewards: (rewards) => set({ rewards }),
  addFavorite: (rewardId) =>
    set((state) => ({
      favorites: [...new Set([...state.favorites, rewardId])],
    })),
  removeFavorite: (rewardId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== rewardId),
    })),
  isFavorite: (rewardId) => get().favorites.includes(rewardId),
}));
