import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import React, {ReactNode, useContext} from 'react';
import {
  MD3DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,

  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    background: 'white',
    primary: '#3daccf',
    secondary: 'purple',
  },
};

const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: '#3daccf',
    secondary: 'purple',
  },
};

type DefaultCombinedTheme = typeof CombinedDefaultTheme;

interface ThemeContext {
  theme: DefaultCombinedTheme;
  toggleTheme: () => void;
  isThemeDark: boolean;
}

export const ThemeContext = React.createContext<ThemeContext>(
  {} as ThemeContext,
);

export const useTheme = () => useContext(ThemeContext);
/**
 * Theme Provider for app
 */
export const ThemeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
      theme,
    }),
    [toggleTheme, isThemeDark, theme],
  );

  return (
    <ThemeContext.Provider value={preferences}>
      {children}
    </ThemeContext.Provider>
  );
};
