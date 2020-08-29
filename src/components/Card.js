/** @jsx jsx */
import { jsx, css as cs } from '@emotion/core';
import { useTheme } from 'hooks/Theme';

export const Card = ({
  css,
  width = 1,
  padding = 0.75,
  marginTop = 1,
  children,
}) => {
  const theme = useTheme();
  const CardStyle = cs`
    ${css}
    width: ${width * 100}%;
    margin: ${marginTop}rem auto 0 auto;
    padding: ${padding}rem;
    border-radius: 1rem;
    background-color: ${theme.color.neutral[0]};
    border: 1px solid ${theme.color.neutral[3]};
  `;
  return <div css={CardStyle}>{children}</div>;
};

export default Card;
