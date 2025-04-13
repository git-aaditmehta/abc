import React from 'react';
import { cn } from '@/lib/utils';

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Spinner = ({ className, ...props }: SpinnerProps) => {
  return (
    <div
      className={cn("animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full", className)}
      {...props}
    />
  );
}; 