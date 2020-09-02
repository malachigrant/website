/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import { useTheme } from 'hooks/Theme';

export const Label = ({ value, required }) => {
  const theme = useTheme();
  const LabelStyle = css`
    color: ${theme.color.neutral[6]};
    font-size: ${theme.text.size.small};
    ${!!required &&
    `&::before {
      content: '*';
      color: #ff0000;
    }`}
  `;
  return <div css={LabelStyle}>{value}</div>;
};

export default Label;
