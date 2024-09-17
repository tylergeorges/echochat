import Image from 'next/image';
import { forwardRef } from 'react';
import { type VariantProps, tv } from 'tailwind-variants';

import { cn } from '@/lib/utils';

const avatar = tv({
  base: 'relative aspect-square overflow-hidden rounded-full terminal:rounded-none',

  variants: {
    size: {
      xs: 'h-2 w-2',
      sm: 'h-3 w-3',
      md: 'size-8',
      lg: 'size-10',
      xl: 'size-12',
      '2xl': 'size-16',
      '3xl': 'size-20'
    }
  },

  defaultVariants: {
    size: 'md'
  }
});

export type AvatarVariants = VariantProps<typeof avatar>;

interface AvatarProps extends React.ComponentProps<'div'>, AvatarVariants {}

export const Avatar = forwardRef<HTMLDivElement, React.PropsWithChildren<AvatarProps>>(
  ({ className, children, size, ...props }, ref) => (
    <div {...props} className={avatar({ size, className })} ref={ref}>
      {children}
    </div>
  )
);

Avatar.displayName = 'Avatar';

interface AvatarImageProps extends React.ComponentProps<typeof Image>, AvatarVariants {}

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, width = 16, height = 16, alt = '', ...props }, ref) => (
    <Image
      referrerPolicy="no-referrer" // load images
      alt={alt}
      width={width}
      height={height}
      unoptimized
      {...props}
      className={cn('pointer-events-none aspect-square size-full select-none', className)}
      ref={ref}
    />
  )
);

AvatarImage.displayName = 'AvatarImage';

interface AvatarFallbackProps extends React.ComponentProps<'div'>, AvatarVariants {}

export const AvatarFallback = forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => (
    <div
      {...props}
      className={cn(
        'flex aspect-square h-full w-auto items-center justify-center bg-muted',
        className
      )}
      ref={ref}
    />
  )
);

AvatarFallback.displayName = 'AvatarFallback';
