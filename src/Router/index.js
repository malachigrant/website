/** @jsx jsx */
import { jsx } from '@emotion/core';
import { HashRouter, Route } from 'react-router-dom';

import { Col } from 'components/layout';
import { AppBar } from 'components/AppBar';
import config from './routeConfig';

export const Router = () => {
  return (
    <HashRouter>
      <Col>
        <AppBar />
        {config.map(({ path, component, exact }, i) => (
          <Route key={i} path={path} component={component} exact={exact} />
        ))}
      </Col>
    </HashRouter>
  );
};

export default Router;
