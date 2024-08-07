import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import { withTV } from 'tailwind-variants/transformer';

import TailwindAnimate from 'tailwindcss-animate';
import { TailwindFlexible, TailwindChildren } from './src/lib/tailwind/tailwind-plugins';
import { generateScreens } from './src/lib/tailwind/tailwind-screens';

const config: Config = {
  darkMode: ['class'],

  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],

  theme: {
    screens: {
      ...generateScreens({ sm: 640, md: 768, lg: 1024, xl: 1280 })
    },

    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'card-gradient':
          'linear-gradient(to bottom, var(--card-gradient-primary), var(--card-gradient-secondary))'
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      colors: {
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        border: 'rgb(var(--muted-foreground) / <alpha-value>)',
        input: {
          DEFAULT: 'rgb(var(--input) / <alpha-value>)',
          form: 'rgb(var(--input-form) / <alpha-value>)'
        },
        modifier: {
          active: 'rgb(var(--modifier-active) / <alpha-value>)',
          hover: 'rgb(var(--modifier-hover) / <alpha-value>)',
          selected: 'rgb(var(--modifier-selected) / <alpha-value>)'
        },
        'channel-icon': 'rgb(var(--channel-icon) / <alpha-value>)',
        background: {
          DEFAULT: 'rgb(var(--background) / <alpha-value>)',
          secondary: 'rgb(var(--background-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--background-tertiary) / <alpha-value>)'
        },
        interactive: {
          normal: 'rgb(var(--interactive-normal) / <alpha-value>)',
          hover: 'rgb(var(--interactive-hover) / <alpha-value>)',
          active: 'rgb(var(--interactive-active) / <alpha-value>)',
          muted: 'rgb(var(--interactive-muted) / <alpha-value>)'
        },
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          foreground: 'rgb(var(--primary-foreground) / <alpha-value>)'
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
          foreground: 'rgb(var(--secondary-foreground) / <alpha-value>)'
        },
        muted: {
          DEFAULT: 'rgb(var(--muted) / <alpha-value>)',
          foreground: 'rgb(var(--muted-foreground) / <alpha-value>)'
        },
        card: {
          DEFAULT: 'rgb(var(--card) / <alpha-value>)',
          foreground: 'rgb(var(--card-foreground) / <alpha-value>)',
          gradient: {
            primary: 'rgb(var(--card-gradient-primary) / <alpha-value>)',
            secondary: 'rgb(var(--card-gradient-secondary) / <alpha-value>)',
            'border-primary': 'rgb(var(--card-gradient-border-primary) / <alpha-value>)',
            'border-secondary': 'rgb(var(--card-gradient-border-secondary) / <alpha-value>)'
          }
        }
      },

      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans]
      }
    }
  },

  plugins: [TailwindFlexible, TailwindChildren, TailwindAnimate]
};

export default withTV(config);
