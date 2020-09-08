/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import { useTheme } from 'hooks/Theme';
import { HoverMenu } from 'components/HoverMenu';

import routeConfig from 'Router/routeConfig';

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
      {routeConfig.map(({ path, name, subRoutes }, i) => (
        <HoverMenu
          key={i}
          name={name}
          path={path}
          options={
            !!subRoutes &&
            subRoutes.map((subRoute) => ({
              name: subRoute.name,
              path: subRoute.path,
            }))
          }
        />
      ))}
    </div>
  );
};
