import { forwardRef } from 'react';
import Image from 'next/image';
import { type VariantProps, tv } from 'tailwind-variants';

import { cn } from '@/lib/utils';

const avatar = tv({
  base: 'relative rounded-full',

  variants: {
    size: {
      xs: 'h-2 w-2',
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-[28px] w-[28px]',
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
    <div {...props} className={cn(avatar({ size }), className)} ref={ref}>
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
      className={cn('h-full w-auto rounded-full', className)}
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
        'flex h-full w-auto items-center justify-center rounded-full bg-muted',
        className
      )}
      ref={ref}
    />
  )
);

AvatarFallback.displayName = 'AvatarFallback';
