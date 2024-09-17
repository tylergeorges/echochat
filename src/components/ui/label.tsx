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
      'absolute -top-5 left-2 z-10 hidden h-[1rem] bg-background px-1 text-base font-medium lowercase leading-[1] text-muted terminal:inline-flex',
      className
    )}
    {...props}
  >
    <label className="h-[1rem] select-none leading-[1] text-base relative max-h-full">{children}</label>
  </div>
);
