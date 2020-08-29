/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useContext, createContext } from 'react';

const theme = {
  color: {
    primary: '#4343e6',
    neutral: [
      '#ffffff',
      '#f4f4f4',
      '#d1d1d1',
      '#a3a3a3',
      '#898989',
      '#757575',
      '#626262',
      '#505050',
      '#383838',
      '#242424',
      '#000000',
    ],
  },
  text: {
    size: {
      small: '0.75rem',
      medium: '1rem',
      large: '1.5rem',
    },
  },
};

const ThemeContext = createContext({ theme });

export const ThemeProvider = ({ children }) => {
  return <ThemeContext.Provider value={theme} children={children} />;
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

export default ThemeProvider;
