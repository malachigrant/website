/** @jsx jsx */
import { jsx } from '@emotion/core';
import { HashRouter, Route } from 'react-router-dom';

import HomePage from 'pages/HomePage';

export const Router = () => {
  return (
    <HashRouter>
      <Route path="/" component={HomePage} />
    </HashRouter>
  );
};

export default Router;
