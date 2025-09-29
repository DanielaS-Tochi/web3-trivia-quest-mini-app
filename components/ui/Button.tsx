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
      default: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-purple-600 text-white hover:bg-purple-700',
      outline: 'border border-gray-300 bg-transparent text-gray-800 hover:bg-gray-50',
      success: 'bg-green-600 text-white hover:bg-green-700',
      danger: 'bg-red-600 text-white hover:bg-red-700',
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