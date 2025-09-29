import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'default' | 'secondary' | 'outline' | 'success' | 'danger';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none';
    const variants: Record<Variant, string> = {
      default: 'bg-blue-700 text-white hover:bg-blue-800 focus:ring-2 focus:ring-blue-500',
      secondary: 'bg-purple-700 text-white hover:bg-purple-800 focus:ring-2 focus:ring-purple-500',
      outline: 'border-2 border-gray-600 bg-transparent text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-2 focus:ring-gray-500',
      success: 'bg-green-700 text-white hover:bg-green-800 focus:ring-2 focus:ring-green-500',
      danger: 'bg-red-700 text-white hover:bg-red-800 focus:ring-2 focus:ring-red-500',
    };

    const sizes: Record<Size, string> = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';