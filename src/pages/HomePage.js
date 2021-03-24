/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import { Col } from 'components/layout';
import Card from 'components/Card';
import cpu_gpu_comparison from 'images/cpu_gpu_comparison.png';

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
    & > img {
      width: 75%;
      margin-left: 2em;
    }
    & > .imageFooter {
      margin-left: 4em;
      font-style: italic;
      margin-bottom: 1em;
    }
  `;
  return (
    <Col width={4 / 5}>
      <Card cs={CardStyle}>
        <h1>GPU Programming in Julia with CUDA.jl</h1>
        <h2>Overview</h2>
        <p>
          {`Parallel programming is when a computer runs multiple instructions at the same time. This can happen explicitly, when a programmer specifically writes code to be run in parallel. It can also happen implicitly, when the compiler determines that two instructions can be run at the same time without causing any side effects.
          Parallel programming can use multiple cores in a CPU, and this is great for programming problems where you have a few different bits of code that can be run in parallel.
          However, sometimes you run into situations where you might need to do a few simple instructions that need to run on hundreds, or even thousands of chunks of data.
          This is where GPU programming can give a massive performance boost. An average CPU may have around eight cores. But a GPU could have hundreds or thousands.`}
        </p>
        <img src={cpu_gpu_comparison}></img>
        <div class="imageFooter">
          <span>{'Image from '}</span>
          <a href="https://www.omnisci.com/technical-glossary/cpu-vs-gpu">
            https://www.omnisci.com/technical-glossary/cpu-vs-gpu
          </a>
        </div>
        <h2>CPU Comparison</h2>
      </Card>
    </Col>
  );
};

export default HomePage;
