/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';

import { useTheme } from 'hooks/Theme';

import routeConfig from 'Router/routeConfig';

const AppBarLink = ({ name, ...props }) => {
  const theme = useTheme();
  const LinkStyle = css`
    > a {
      display: block;
      padding: 0.5rem;
      color: ${theme.color.neutral[1]};
      text-decoration: none;
    }
    &:hover {
      background-color: ${theme.color.hover};
    }
  `;
  return (
    <div css={LinkStyle}>
      <Link {...props}>{name}</Link>
    </div>
  );
};

export const AppBar = () => {
  const theme = useTheme();
  const BarStyle = css`
    display: flex;
    flex-direction: row;
    width: 100vw;
    background-color: ${theme.color.primary};
  `;
  return (
    <div css={BarStyle}>
      {routeConfig.map(({ path, name }, i) => (
        <AppBarLink key={i} to={path} name={name} />
      ))}
    </div>
  );
};
