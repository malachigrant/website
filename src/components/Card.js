/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useTheme } from 'hooks/Theme';

export const Card = ({
  cs,
  width = 1,
  padding = 0.75,
  marginTop = 1,
  children,
}) => {
  const theme = useTheme();
  const CardStyle = css`
    width: ${width * 100}%;
    margin: ${marginTop}rem auto 0 auto;
    padding: ${padding}rem;
    border-radius: 1rem;
    background-color: ${theme.color.neutral[0]};
    border: 1px solid ${theme.color.neutral[3]};
  `;
  console.log(cs);
  return <div css={[CardStyle, cs]}>{children}</div>;
};

export default Card;
