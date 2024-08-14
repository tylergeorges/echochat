import { forwardRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { type VariantProps, tv } from 'tailwind-variants';

import { cn } from '@/lib/utils';

export const inputVariants = tv({
  base: 'flex h-10 w-full rounded-md border-0 border-input bg-input px-3 py-2 text-foreground text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',

  variants: {
    variant: {
      default: 'focus-visible:ring-2 focus-visible:ring-border',

      ghost: 'bg-transparent focus:border-brand focus-visible:ring-2 focus-visible:ring-border'
    },

    color: {
      default: '',
      destructive: 'bg-destructive/10 ring-1 ring-destructive/70 placeholder:text-destructive/70',
      form: 'bg-input-form'
    }
  }
});

export type InputVariants = VariantProps<typeof inputVariants>;

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'color'>,
    InputVariants {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, color, ...props }, ref) => (
    <input
      type={type}
      className={cn(inputVariants({ color, variant }), 'h-10 px-2', className)}
      ref={ref}
      {...props}
    />
  )
);

Input.displayName = 'Input ';

interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'color'>,
    InputVariants {}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, color, variant, ...props }, ref) => (
    <textarea className={cn(inputVariants({ color, variant }), className)} ref={ref} {...props} />
  )
);

TextArea.displayName = 'TextArea';

interface MagicTextAreaProps
  extends Omit<React.ComponentProps<typeof TextareaAutosize>, 'color' | 'onSubmit'>,
    InputVariants {
  onSubmit?: (text: string) => void;
}

export const MagicTextArea = forwardRef<HTMLTextAreaElement, MagicTextAreaProps>(
  ({ className, onKeyDown, onSubmit, variant, color, ...props }, ref) => {
    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const target = e.target as HTMLTextAreaElement;

      switch (e.key) {
        case 'Enter': {
          const text = target.value?.trim();
          if (!e.shiftKey) {
            e.preventDefault();

            if (!text) return;

            if (onSubmit) {
              onSubmit(text);
              target.value = '';
            }
          }

          return;
        }
        default:
          if (onKeyDown) onKeyDown(e);
          break;
      }
    };

    return (
      <TextareaAutosize
        className={cn(inputVariants({ color, variant }), className)}
        ref={ref}
        {...props}
        onKeyDown={onKeyDownHandler}
        maxRows={5}
      />
    );
  }
);

MagicTextArea.displayName = 'MagicTextArea';
