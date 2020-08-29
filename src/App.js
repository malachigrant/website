/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import { useTheme } from 'hooks/Theme';
import Column from 'components/layout/Column';
import { AppBar } from 'components/AppBar';
import Router from 'Router';

export const App = () => {
  const theme = useTheme();
  const AppStyle = css`
    width: 100vw;
    height: 100vh;
    background-color: ${theme.color.neutral[1]};
  `;
  return (
    <div css={AppStyle}>
      <Column>
        <AppBar />
        <Router />
      </Column>
    </div>
  );
};

export default App;
