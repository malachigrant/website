/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';
import ReactDOM from 'react-dom';

import ThemeProvider from 'hooks/Theme';
import App from 'App';

const GlobalStyle = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-size: 16px;
  }
`;

ReactDOM.render(
  <ThemeProvider>
    <Global styles={GlobalStyle} />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
