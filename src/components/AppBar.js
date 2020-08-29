/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useTheme } from 'hooks/Theme';

export const AppBar = () => {
  const theme = useTheme();
  const BarStyle = css`
    width: 100vw;
    background-color: ${theme.color.primary};
  `;
  return (
    <div css={BarStyle}>
      <div>Hello</div>
    </div>
  );
};
