/** @jsx jsx */
import { jsx } from '@emotion/core';

import { Col } from 'components/layout';
import Card from 'components/Card';

export const HomePage = () => {
  return (
    <Col width={4 / 5}>
      <Card>
        <div>Hello</div>
      </Card>
    </Col>
  );
};

export default HomePage;
