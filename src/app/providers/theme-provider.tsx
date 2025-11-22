import { type FC, useEffect, useState } from 'react';

import { type Theme, ThemeContext } from '@/features/theme-toggle';

type ThemeProviderProps = {
  children: React.ReactNode;
  renderTheme?: (theme: Theme) => React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  renderTheme,
  defaultTheme = 'dark',
  storageKey = 'ui-theme',
  ...props
}) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
      {renderTheme?.(theme)}
    </ThemeContext.Provider>
  );
};
