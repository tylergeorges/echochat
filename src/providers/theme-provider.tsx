'use client';

import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';

/** Themes that don't affect color */
export type VisualTheme = 'default' | 'terminal';

const visualThemes: VisualTheme[] = ['default', 'terminal'];

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider {...props} themes={visualThemes} defaultTheme="default">
      {children}
    </NextThemesProvider>
  );
};

interface UseThemeProps {
  /** List of all available theme names */
  themes: VisualTheme[];
  /** Forced theme name for the current page */
  forcedTheme?: VisualTheme | undefined;
  /** Update the theme */
  setTheme: (visualTheme: VisualTheme) => void;
  /** Active theme name */
  theme?: VisualTheme | undefined;
  /** If `enableSystem` is true and the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `theme` */
  resolvedTheme?: VisualTheme | undefined;
}

export const useTheme = (): UseThemeProps => {
  const { setTheme, themes, forcedTheme, resolvedTheme, theme } = useNextTheme();

  const setVisualTheme = (visualTheme: VisualTheme) => {
    if (theme !== visualTheme) setTheme(visualTheme);
  };

  return {
    theme: theme as VisualTheme,
    resolvedTheme: resolvedTheme as VisualTheme,
    themes: themes as VisualTheme[],
    forcedTheme: forcedTheme as VisualTheme,
    setTheme: setVisualTheme
  };
};
