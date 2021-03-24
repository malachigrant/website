/** @jsx jsx */
import { jsx } from '@emotion/core';
import { HashRouter, Route } from 'react-router-dom';
import React from 'react';

import { Col } from 'components/layout';
import { AppBar } from 'components/AppBar';
import config from './routeConfig';

export const Router = () => {
  return (
    <HashRouter>
      <Col>
        {config.map(({ subRoutes, path, component, exact }, i) => (
          <Route
            key={i}
            path={path}
            render={({ match: { url } }) => (
              <React.Fragment>
                <Route
                  exact={exact !== false}
                  path={`${url}`}
                  component={component}
                />
                {!!subRoutes &&
                  subRoutes.map((subRoute, j) => (
                    <Route
                      key={j}
                      path={`${url}${subRoute.path}`}
                      component={subRoute.component}
                    />
                  ))}
              </React.Fragment>
            )}
          ></Route>
        ))}
      </Col>
    </HashRouter>
  );
};

export default Router;
