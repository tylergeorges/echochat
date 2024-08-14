import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

export const Row = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('horizontal', className)} {...props} />
  )
);

Row.displayName = 'Row';

export const Column = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('vertical', className)} {...props} />
  )
);

Column.displayName = 'Column';
