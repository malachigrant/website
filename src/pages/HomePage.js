/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import { Col } from 'components/layout';
import Card from 'components/Card';

export const HomePage = () => {
  const CardStyle = css`
    & > h1 {
      text-align: center;
      padding-bottom: 1em;
    }
    & > h2 {
      padding-bottom: 0.5em;
    }
    & > p {
      padding-bottom: 1em;
    }
  `;
  return (
    <Col width={4 / 5}>
      <Card cs={CardStyle}>
        <h1>GPU Programming in Julia with CUDA.jl</h1>
        <h2>Introduction</h2>
        <p>
          {`Parallel processing with a CPU is great for speeding up programming problems that need to run a few functions on a few different sets of data where one set is not dependent on the result of another.
          However, what if you have a problem that requires running a simple function maybe thousands of times on different sets of data? That's where programming on a GPU can be very helpful.`}
        </p>
        <h2>CPU Comparison</h2>
      </Card>
    </Col>
  );
};

export default HomePage;
