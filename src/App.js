/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import { useTheme } from 'hooks/Theme';
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
      <Router />
    </div>
  );
};

export default App;
