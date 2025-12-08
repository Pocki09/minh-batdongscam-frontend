import React from 'react';

type BadgeVariant = 'default' | 'success' | 'danger' | 'warning' | 'info' | 'pink' | 'gold';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-700', 
    danger: 'bg-red-100 text-red-600',   
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-700',
    pink: 'bg-pink-100 text-pink-600 border border-pink-200', 
    gold: 'bg-yellow-50 text-yellow-600 border border-yellow-200', 
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold uppercase leading-4 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}