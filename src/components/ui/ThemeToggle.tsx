import { Moon, Sun } from 'lucide-react';
import { useStore } from '../../stores';

export function ThemeToggle() {
  const { theme, toggleTheme } = useStore((state) => ({
    theme: state.theme,
    toggleTheme: state.toggleTheme,
  }));

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-secondary-200 dark:bg-secondary-700 transition-colors hover:bg-secondary-300 dark:hover:bg-secondary-600"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-warning-500" />
      ) : (
        <Moon className="w-5 h-5 text-primary-600" />
      )}
    </button>
  );
}
