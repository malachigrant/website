/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { CodeBlock, dracula } from 'react-code-blocks';

import { Col } from 'components/layout';
import Card from 'components/Card';
import cpu_gpu_comparison from 'images/cpu_gpu_comparison.png';
import sequentialAdd from 'julia/sequential_add.jl';
import cpuParallelAdd from 'julia/cpu_parallel_add.jl';
import cuArrayAdd from 'julia/gpu_broadcast_add.jl';
import cuArrayTransfers from 'julia/cuarray_transfers.jl';
import gpuKernelAdd from 'julia/gpu_kernel_add.jl';

const Block = ({ text }) => {
  return (
    <CodeBlock
      showLineNumbers={false}
      theme={dracula}
      language="julia"
      text={text}
    />
  );
};

const Link = ({ className, label, url }) => {
  return (
    <div className={className}>
      {label && <span>{label}</span>}
      <a href={url}>{url}</a>
    </div>
  );
};

export const HomePage = () => {
  const CardStyle = css`
    margin-top: 1em;
    margin-bottom: 1em;
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
  const gpuKernelLines = gpuKernelAdd.split('\n');
  return (
    <Col width={4 / 5}>
      <Card cs={CardStyle}>
        <h1>GPU Programming in Julia with CUDA.jl</h1>
        <h2>Overview</h2>
        <p>
          {`Parallel programming is when a computer runs multiple instructions at the same time. This can happen explicitly, when a programmer specifically writes code to be run in parallel. It can also happen implicitly, when the compiler determines that two instructions can be run at the same time without causing any side effects.
          Parallel programming can use multiple cores in a CPU, and this is great for programming problems where you have a few different bits of code that can be run in parallel.
          However, sometimes you run into situations where you might need to do a few simple instructions that need to run on hundreds, or even thousands of chunks of data.
          This is where GPU programming can give a massive performance boost. An average CPU may have around four to eight cores. But a GPU could have hundreds or even thousands.`}
        </p>
        <img src={cpu_gpu_comparison}></img>
        <Link
          className="imageFooter"
          label="Image from "
          url="https://www.omnisci.com/technical-glossary/cpu-vs-gpu"
        />
        <h2>Parallel Programming on a CPU</h2>
        <p>
          {`Before we learn how to parallel program on a GPU, we need to understand how to do it on a CPU. In order to start thinking about parallel programming, we can imagine a situation where we wanted to take two large arrays and add each element of the arrays and put the result into a third array. To do this, we could use a for loop to go through each element of the arrays and add them together into the third array. The code would look something like this.
          `}
        </p>
        <Block text={sequentialAdd} />
        <p>
          {`This, however, would be very slow. To speed it up, we could use different CPU cores in our machine to add different elements of the array. To do this in Julia, we can simply convert our for loop to a parallel for loop by adding the @threads macro to the for loop, like so.`}
        </p>
        <Block text={cpuParallelAdd} />
        <p>
          {`This essentially just tells the compiler to run multiple iterations of this loop at the same time. So if you are using four threads, Julia can run up to four iterations at once, giving you a potential performance increase of 4x. Realistically, however, your computer will be doing tasks in the background, and there will be some overhead for this parallelization, so you may get less of a performance boost than you expect. On my machine, benchmarking both of these functions, I got around a 3.5x performance boost with the parallel loop. `}
        </p>
        <p>{`So this is how to parallel program with a CPU, but how about a GPU? There's a few ways to do it. I will cover two methods from CUDA.jl: CuArrays, and GPU kernels.`}</p>
        <h2>GPU Programming with CuArrays</h2>
        <p>
          {`Julia's CUDA.jl makes much of GPU programming simple. For example, it has CuArrays, which stores an array directly on the GPU, and a lot of the GPU-specific programming is abstracted away so we can easily manipulate arrays in a very performant way.`}
        </p>
        <Block text={cuArrayAdd} />
        <p>
          {`The example above has a few differences when compared to our earlier example of CPU programs. We create the arrays above using CUDA.ones, and CUDA.zeros as opposed to the base functions we used before, ones and zeros. This is to create a CuArray on the GPU, rather than a regular array in memory. If we instead wanted to use an array that we had already stored in memory, we could use the CuArray constructor, which takes in a regular array and moves it to the GPU. We have also named our array variables differently, by appending '_d' to the end of each. This is a convention to indicate that the array is on a different device, rather than in memory. We are also using the CUDA.@sync macro. This is to wait until this instruction is done before proceeding.
          One other difference is that we're using broadcast syntax. This is the operator '.=' that we've used. This is used to avoid scalar operations on the GPU, as they will slow down the computation significantly.`}
        </p>
        <Block text={cuArrayTransfers} />
        <h2>GPU Programming with Kernels</h2>
        <p>
          {`Using CuArrays gave us a great performance boost, but they are very limited, and we can do better. By writing a kernel, we can essentially create a function that can run on every thread in our GPU all at once. However, to do this, we need to be able to determine which thread the function is running on from within the function itself, otherwise we wouldn't know which element of the array to work on. We can do this by calculating an id for each thread. This is unfortunately not as straightforward as one would like, since in GPUs, threads are grouped into blocks. With some fairly simple math, however, we can get an id.`}
        </p>
        <Block text={gpuKernelAdd} />
        <p>
          {`As you can see, this code is much more complex than anything we have used so far. Let's go through the new stuff.`}
        </p>
        <Block text={gpuKernelLines[0]} />
        <p>
          {`This line simply declares a constant that we get from CUDA that tells us the maximum number of threads we can have per block in our GPU.`}
        </p>
        <Block text={gpuKernelLines[2]} />
        <p>
          {`This is that math we talked about to get an id for our thread. First, we take our block number (subtracting 1, since Julia arrays are 1-indexed), and multiply that by the x value of our block dimensions. Since we are just working on a one-dimensional array, the x value is the number of blocks we have. Finally, we add out thread number in the block to get our final id number.`}
        </p>
        <Block text={gpuKernelLines[10]} />
        <p>
          {`This is where we actually run our kernel. If we want our arrays to be added in as short of time as possible, we will want to saturate our GPU with work. To do this, we set our thread count to be the max number of threads we can have, and our block count to be as many as we need to do our entire array.`}
        </p>
        <Block text={gpuKernelLines[3]} />
        <p>
          {`One final thing to keep in mind when using kernels, is that the max number of threads may not be a multiple of your array length. If this is the case, some threads in one block may run your kernel function, but will not have any work to do. This is fine, but you will have to check for it to ensure you don't accidentally try to access an invalid index of an array. In this case, it is simple enough to just not do any work if our id is less than N.`}
        </p>
        <h2>References</h2>
        <Link url="http://www.cs.unb.ca/~aubanel/JuliaGPUNotes.html" />
        <Link url="https://juliagpu.gitlab.io/CUDA.jl/tutorials/introduction/" />
        <Link url="https://www.omnisci.com/technical-glossary/cpu-vs-gpu" />
      </Card>
    </Col>
  );
};

export default HomePage;
