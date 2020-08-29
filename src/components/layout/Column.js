/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export const Column = ({ children }) => {
  const Style = css`
    display: flex;
    flex-direction: column;
  `;
  return <div css={Style} children={children} />;
};

export default Column;
