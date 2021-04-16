/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { CodeBlock, dracula } from 'react-code-blocks';

import { Col } from 'components/layout';
import Card from 'components/Card';
import cpu_gpu_comparison from 'images/cpu_gpu_comparison.png';
import cuda_indexing from 'images/cuda_indexing.png';
import sequentialAdd from 'julia/sequential_add.jl';
import cpuParallelAdd from 'julia/cpu_parallel_add.jl';
import cuArrayAdd from 'julia/gpu_broadcast_add.jl';
import cuArrayTransfers from 'julia/cuarray_transfers.jl';
import gpuKernelAdd from 'julia/gpu_kernel_add.jl';
import incrementExample from 'julia/increment.jl';
import reduceImage from 'images/reduce.png';
import reduceExamples from 'julia/reduce.jl';

const Block = ({ text, lineNumbers = false }) => {
  return (
    <CodeBlock
      showLineNumbers={lineNumbers}
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
    & > img.smallImg {
      width: 30%;
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
        <p>
          {`In the image above, you can see that a CPU has DRAM, one cache, one control unit, and a few Arithmetic Logic Units (ALUs). These ALUs are the CPU's cores, and the control unit controls them. In a GPU, on the other hand, there are several 'blocks' that have one control unit, one cache, and several ALUs each. There is also some DRAM that is shared between the blocks.`}
        </p>
        <p>{`The reason for this difference in architecture is so that a GPU can perform a dedicated task: rendering graphics. A CPU is designed to be able to do many complex operations accurately. Rendering graphics on a screen, however, doesn't require perfect calculation accuracy, and there aren't many complex operations needed. In addition, each pixel can be rendered independently, allowing massive parallelization. You could think of each block in a GPU rendering one row of pixels, and each ALU in that block rendering one pixel. This isn't quite how it works, but it is a good way to imagine how a GPU can be so much better at this task than a CPU.`}</p>
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
          One other difference is that we're using broadcast syntax with the operators '.=' and '.+' that we used. This is used to avoid scalar operations on the GPU, as they will slow down the computation significantly. Julia also has a feature where it will 'fuse' together multiple broadcast operations in one statement. This essentially just runs all the operations on each element of the array at once, rather than going through the array for each operation. This results in a huge performance boost, so we should be sure to use broadcast operations wherever appropriate.`}
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
          {`This is that math we talked about to get an id for our thread. First, we take our block number (subtracting 1, since Julia arrays are 1-indexed), and multiply that by the x value of our block dimensions. Since we are just working on a one-dimensional array, the x value is the number of blocks we have. Finally, we add our thread number in the block to get our final id number.`}
        </p>
        <img src={cuda_indexing} />
        <Link
          className="imageFooter"
          label="Image from "
          url="https://developer.nvidia.com/blog/even-easier-introduction-cuda/"
        />
        <Block text={gpuKernelLines[10]} />
        <p>
          {`This is where we actually run our kernel. If we want our arrays to be added in as short of time as possible, we will want to saturate our GPU with work. To do this, we set our thread count to be the max number of threads we can have, and our block count to be as many as we need to do our entire array.`}
        </p>
        <Block text={gpuKernelLines[3]} />
        <p>
          {`One final thing to keep in mind when using kernels, is that the max number of threads may not be a multiple of your array length. If this is the case, some threads in one block may run your kernel function, but will not have any work to do. This is fine, but you will have to check for it to ensure you don't accidentally try to access an invalid index of an array. In this case, it is simple enough to just not do any work if our id is less than N.`}
        </p>
        <h2>Data Dependencies</h2>
        <p>{`So far, we have only used a very simple and contrived example to show GPU programming. In this example, there are no data dependencies. This means that we could run our code on every single element of our array in any order and we would get the same result. Problems like this are very easy and quick to solve using a GPU, but it is not often a realistic situation. Most of the time, you will have some operations to perform on some data that must happen before some other operations can begin. This is known as a data dependency.`}</p>
        <p>{`A more realistic problem could be a sum function, where we take an array and output the sum of all of its elements. You might think that this is a simple problem, we could just have a "sum" variable that gets updated as we loop through our array. This is a good solution, if we are doing it sequentially. However, if we are doing it in parallel, this would not work. The reason for this is that we cannot reliably update a variable multiple times at the same time, which could happen when using multiple cores. This is because of how an increment instruction get translated to machine language.`}</p>
        <Block text={incrementExample} lineNumbers />
        <p>{`On the first line, we see a possible line of code for our naive sum function solution above. Below this is low-level instructions that this line of code may be converted to. On lines 3 and 4, we store our sum variable and our array element in registers. On line 5, we add those registers into another register. Finally, on line 6, we store the result back into the sum variable. In sequential programming, this would be fine, but when we have multiple cores executing code at the same time, we could end up in a situation where core 1 increments sum, and stores the value back into sum. However, before the value gets stores in sum again, core 2 has already taken the value of sum to increment it. This will result in the work done by core 1 being overwritten.`}</p>
        <p>{`A better way to perform a sum function would be to use the array itself, and add the second half of the array, to the first half. Now the sum of the first half of the array is the sum of the entire original array. If we then repeat this process, now the first quarter of the array has the same sum as our entire original array. We can continue doing this until the first element of the array contains the sum of the entire original array. This will allow for some parallelization, since for each step we can add two sub-arrays together, in much the same way as we have already been doing in our first example.`}</p>
        <img className="smallImg" src={reduceImage} />
        <p>{`Unfortunately, we get less parallelization with each step we do, with the last step only adding one array element to one other element. But this is still far better than simply sequentially summing up our array, so lets see what kind of results we can get.`}</p>
        <Block text={reduceExamples} />
        <p>{`In the above code, there are several different example of this problem, and benchmarks from my computer for each. Sequential is obviously very slow, and CPU parallel with 4 threads is only about 3 times better. However, when we switch to using CuArrays and CUDA kernels, we get much better results. Nearly 100 times faster than sequential when we used kernels! Clearly we can get great results with GPU programming, even when we have to work around data dependencies!`}</p>
        <h2>References</h2>
        <Link url="http://www.cs.unb.ca/~aubanel/JuliaGPUNotes.html" />
        <Link url="https://juliagpu.gitlab.io/CUDA.jl/tutorials/introduction/" />
        <Link url="https://www.omnisci.com/technical-glossary/cpu-vs-gpu" />
        <Link url="https://developer.nvidia.com/blog/even-easier-introduction-cuda/" />
        <Link url="https://julialang.org/blog/2018/05/extensible-broadcast-fusion/" />
      </Card>
    </Col>
  );
};

export default HomePage;
