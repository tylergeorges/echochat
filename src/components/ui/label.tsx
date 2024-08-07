import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, htmlFor, children, ...props }, ref) => (
    <label
      htmlFor={htmlFor}
      className={cn(
        'select-none text-xs font-bold uppercase text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </label>
  )
);

Label.displayName = 'Label';
