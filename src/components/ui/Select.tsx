import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

export function Select({ value, onChange, options, placeholder, className }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'w-full px-4 py-2.5 rounded-xl border border-secondary-200 dark:border-secondary-700',
        'bg-white dark:bg-secondary-800 text-secondary-900 dark:text-secondary-100',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
        'transition-all duration-200 cursor-pointer',
        className
      )}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

interface DropdownItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

interface DropdownMenuProps {
  items: DropdownItem[];
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function DropdownMenu({ items, isOpen, onClose, className }: DropdownMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        className={cn(
          'absolute right-0 mt-2 w-48 bg-white dark:bg-secondary-800 rounded-xl shadow-lg',
          'border border-secondary-200 dark:border-secondary-700 divide-y divide-secondary-100',
          'dark:divide-secondary-700 z-50',
          className
        )}
      >
        {items.map((item, index) => (
          <motion.button
            key={index}
            onClick={() => {
              item.onClick();
              onClose();
            }}
            whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
            className={cn(
              'w-full px-4 py-2 text-left text-sm font-medium transition-colors flex items-center gap-2',
              item.variant === 'danger'
                ? 'text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-900/20'
                : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-700/50'
            )}
          >
            {item.icon && <span className="w-4 h-4">{item.icon}</span>}
            {item.label}
          </motion.button>
        ))}
      </motion.div>
    </>
  );
}
