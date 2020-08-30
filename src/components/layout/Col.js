/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export const Col = ({ children }) => {
  const Style = css`
    display: flex;
    flex-direction: column;
  `;
  return <div css={Style} children={children} />;
};

export default Col;
