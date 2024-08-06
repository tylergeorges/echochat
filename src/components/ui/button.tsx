import { forwardRef } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const buttonVariants = tv({
  base: cn(
    'relative inline-flex items-center whitespace-nowrap rounded-md px-4 py-2 text-center text-sm transition duration-300 ease-out',
    'outline-none ring-border focus-visible:ring-2',
    'items-center justify-center overflow-hidden align-middle font-semibold disabled:cursor-not-allowed disabled:opacity-50'
  ),

  variants: {
    color: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border-input hover:bg-accent hover:text-accent-foreground border',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
    },

    variant: {
      default: '',

      link: 'bg-transparent hover:underline',

      outline:
        'border border-border bg-transparent text-primary hover:bg-secondary hover:text-secondary-foreground',

      ghost: 'hover:bg-accent border-none bg-transparent text-primary',

      transparent: 'bg-transparent'
    },

    size: {
      xs: 'w-[52px] min-w-[52px] gap-1 p-1 text-xs',

      sm: 'h-9 gap-1 px-3 py-2 text-xs',

      md: 'h-10 gap-2 px-6 py-3 text-sm',

      lg: 'h-11 gap-3 px-7 py-3.5 text-base',

      xl: 'h-14 gap-2 rounded-lg px-6 text-base',

      icon: 'size-10 p-0'
    },

    round: {
      true: 'rounded-full'
    },

    fill: {
      true: 'w-full'
    }
  },

  defaultVariants: {
    color: 'default',
    variant: 'default',
    size: 'md'
  },

  compoundVariants: [
    {
      color: 'default',
      variant: 'outline',
      className:
        'border border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground'
    },
    {
      color: 'destructive',
      variant: 'outline',
      className:
        'border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground border bg-transparent'
    },
    {
      color: 'default',
      variant: 'outline',
      className: 'border-accent hover:bg-accent border bg-transparent text-primary'
    },

    {
      color: 'default',
      variant: 'ghost',
      className: 'text-brand hover:bg-brand hover:text-brand-foreground bg-transparent'
    },
    {
      color: 'default',
      variant: 'ghost',
      className:
        'bg-transparent text-primary-foreground hover:bg-primary hover:text-primary-foreground'
    },
    {
      color: 'destructive',
      variant: 'ghost',
      className:
        'text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent'
    },
    {
      color: 'default',
      variant: 'ghost',
      className: 'hover:bg-accent bg-transparent text-primary'
    }
  ]
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    ButtonVariants {}

export const Button = forwardRef<HTMLButtonElement, React.PropsWithChildren<ButtonProps>>(
  ({ className, type = 'button', children, variant, color, fill, size, round, ...props }, ref) => (
    <button
      {...props}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={buttonVariants({ variant, color, round, fill, size, className })}
      ref={ref}
    >
      {children}
    </button>
  )
);

Button.displayName = 'Button';

type ButtonLinkProps = Omit<React.ComponentProps<typeof Link>, 'color'> &
  ButtonVariants & {
    active?: boolean;
    className?: string;
  };

export const ButtonLink = forwardRef<HTMLAnchorElement, React.PropsWithChildren<ButtonLinkProps>>(
  ({ className, children, color, active, variant, fill, round, size, ...props }, ref) => {
    const watchActiveState = typeof active !== 'undefined';

    return (
      <Link
        {...props}
        className={buttonVariants({
          // eslint-disable-next-line no-nested-ternary
          variant: watchActiveState ? (active ? 'default' : 'ghost') : variant,
          fill,
          round,
          color,
          size,
          className: `cursor-pointer ${className}`
        })}
        ref={ref}
      >
        {children}
      </Link>
    );
  }
);

ButtonLink.displayName = 'ButtonLink';
