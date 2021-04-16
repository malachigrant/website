using CUDA
const MAX_THREADS_PER_BLOCK = CUDA.attribute(CUDA.CuDevice(0), CUDA.DEVICE_ATTRIBUTE_MAX_THREADS_PER_BLOCK)

N = 2^20
A = ones(N)

# benchmark took ~200 ms
function sequential_reduce()
  for i = Int(log2(N))-1:-1:0
    k = 2^i
    for j = 1:k
      @inbounds A[j] = A[j] + A[j + k]
    end
  end
end

# benchmark with 4 threads took ~66 ms
function parallel_reduce()
  for i = Int(log2(N))-1:-1:0
    k = 2^i
    Base.Threads.@threads for j = 1:k
      @inbounds A[j] = A[j] + A[j + k]
    end
  end
end

A_d = CUDA.ones(N)

# benchmark took ~2.2 ms
function broadcast_reduce()
  for i = Int(log2(N))-1:-1:0
    k = 2^i
    A_d[1:k] .= A_d[1:k] .+ A_d[k+1:k+k]
  end
end

function kernel_reduce(a_d, n)
  id = (blockIdx().x - 1) * blockDim().x + threadIdx().x
  if (id > n)
    return nothing
  end
  a_d[id] = a_d[id] + a_d[id + n]
  return nothing
end
  
# benchmark took ~2.0 ms
function cuda_reduce()
  for i = Int(log2(N))-1:-1:0
    @cuda blocks=cld(N, MAX_THREADS_PER_BLOCK) threads=MAX_THREADS_PER_BLOCK kernel_reduce(A_d, 2^i)
    synchronize()
  end
end