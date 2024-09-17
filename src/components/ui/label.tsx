import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, htmlFor, children, ...props }, ref) => (
    <label
      htmlFor={htmlFor}
      className={cn(
        'select-none justify-self-start text-left text-xs font-bold uppercase text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
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

export const TerminalLabel = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'absolute -top-6 left-2 z-10 hidden bg-background px-1 font-medium lowercase text-muted terminal:block',
      className
    )}
    {...props}
  >
    <label className="select-none">{children}</label>
  </div>
);
