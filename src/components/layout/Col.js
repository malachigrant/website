/** @jsx jsx */
import { css, jsx } from '@emotion/core';

export const Col = ({ children, width = 1 }) => {
  const Style = css`
    width: ${width * 100}%;
    margin: 0 auto 0 auto;
    display: flex;
    flex-direction: column;
  `;
  return <div css={Style} children={children} />;
};

export default Col;
