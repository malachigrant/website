/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export const Row = ({ children }) => {
  const Style = css`
    display: flex;
    flex-direction: row;
  `;

  return <div css={Style} children={children} />;
};

export default Row;
