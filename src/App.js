/** @jsx jsx */
import { jsx, css } from '@emotion/core';

export const App = () => {
  const Style = css`
    margin: 1em auto 0 auto;
    padding: 1em 2em;
    border-radius: 0.2em;
    &:hover {
      background-color: #000000;
      color: #ffffff;
    }
  `;
  return <div css={Style}>Welcome to my template!</div>;
};

export default App;
