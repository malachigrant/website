/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import ReactDOM from 'react-dom';

import App from 'App';

const AppStyle = css`
  display: flex;
`;

ReactDOM.render(
  <div css={AppStyle}>
    <App />
  </div>,
  document.getElementById('root')
);
