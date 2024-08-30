import Link from 'next/link';
import { forwardRef } from 'react';
import { type VariantProps, tv } from 'tailwind-variants';

import { cn } from '@/lib/utils';

const buttonVariants = tv({
  base: cn(
    'relative inline-flex w-fit cursor-pointer items-center whitespace-nowrap rounded-lg text-center text-sm text-white transition duration-300 ease-out',
    'outline-none ring-primary focus-visible:ring-2',
    'items-center justify-center overflow-hidden align-middle font-medium disabled:cursor-not-allowed disabled:opacity-50'
  ),

  variants: {
    color: {
      default: 'bg-primary text-white ring-white hover:bg-primary/90',
      white: 'bg-white text-black',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive: 'bg-destructive text-white hover:bg-destructive/60 active:bg-destructive/40',
      success: 'bg-success text-white hover:bg-success/90'
    },

    variant: {
      default: '',
      link: 'bg-transparent hover:bg-transparent hover:underline',
      outline:
        'border border-secondary bg-transparent hover:bg-secondary hover:text-secondary-foreground',
      ghost: 'border-none bg-transparent hover:bg-secondary',
      transparent: 'bg-transparent hover:bg-transparent'
    },

    size: {
      xs: 'w-[52px] min-w-[52px] gap-1 p-1 text-xs',
      sm: 'h-9 gap-1 px-3 py-2 text-xs',
      md: 'h-10 gap-2 px-4 py-0.5 text-sm',
      lg: 'h-11 gap-3 px-7 py-3.5 text-base',
      xl: 'h-14 gap-2 px-6 text-base',
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
    size: 'md'
  },

  compoundVariants: [
    {
      color: 'default',
      variant: 'outline',
      className:
        'border border-primary bg-transparent text-primary hover:bg-primary hover:text-white'
    },
    {
      color: 'destructive',
      variant: 'outline',
      className:
        'hover:text-destructive-foreground border border-destructive bg-transparent text-destructive hover:bg-destructive'
    },
    {
      color: 'default',
      variant: 'outline',
      className: 'border-accent hover:bg-accent border bg-transparent text-primary'
    },

    {
      color: 'destructive',
      variant: 'ghost',
      className:
        'bg-transparent text-destructive hover:bg-destructive hover:text-white active:bg-destructive/90 active:text-white'
    },
    {
      color: 'default',
      variant: 'ghost',
      className:
        'bg-transparent text-interactive-normal hover:bg-primary hover:text-white active:bg-primary/90 active:text-white'
    }
  ]
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    ButtonVariants {
  loading?: boolean;
}

const ButtonLoadingDot = () => (
  <div className="relative size-1.5 rounded-full bg-white opacity-30" />
);

const LoadingEllipsis = () => {
  return (
    <div className="absolute flex h-full w-full gap-1 center child:animate-ellipsis [&>*:nth-child(2)]:delay-200 [&>*:nth-child(3)]:delay-100">
      <ButtonLoadingDot />
      <ButtonLoadingDot />
      <ButtonLoadingDot />
    </div>
  );
};

interface ButtonStatusLabelProps {
  loading: boolean;
  className?: string;
}

export const ButtonStatusLabel = ({
  loading,
  children,
  className
}: React.PropsWithChildren<ButtonStatusLabelProps>) => {
  return <span className={cn(className, loading && 'invisible')}>{children}</span>;
};

export const Button = forwardRef<HTMLButtonElement, React.PropsWithChildren<ButtonProps>>(
  (
    {
      className,
      type = 'button',
      disabled,
      children,
      variant,
      color,
      loading,
      fill,
      size,
      round,
      ...props
    },
    ref
  ) => (
    <button
      {...props}
      type={type}
      className={buttonVariants({
        variant,
        color,
        round,
        fill,
        size,
        className
      })}
      disabled={loading || disabled}
      ref={ref}
    >
      {children}

      {loading && <LoadingEllipsis />}
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
          variant: watchActiveState ? (active ? 'default' : 'ghost') : variant,
          fill,
          round,
          color,
          size,
          className: ` ${className}`
        })}
        ref={ref}
      >
        {children}
      </Link>
    );
  }
);

ButtonLink.displayName = 'ButtonLink';
