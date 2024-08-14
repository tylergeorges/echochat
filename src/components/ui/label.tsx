import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, htmlFor, children, ...props }, ref) => (
    <label
      htmlFor={htmlFor}
      className={cn(
        'select-none justify-self-start text-left font-bold text-muted-foreground text-xs uppercase peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
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
