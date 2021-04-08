const MAX_THREADS_PER_BLOCK = CUDA.attribute(CUDA.CuDevice(0), CUDA.DEVICE_ATTRIBUTE_MAX_THREADS_PER_BLOCK)
function kernel_add(x_d, y_d, z_d, N)
  id = (blockIdx().x - 1) * blockDim().x + threadIdx().x
  if (id <= N)
    z_d[id] = x_d[id] + y_d[id]
  end
  return nothing
end

function cuda_add()
  @cuda blocks=cld(N, MAX_THREADS_PER_BLOCK) threads=MAX_THREADS_PER_BLOCK kernel_add(a_d, b_d, c_d, N)
  synchronize()
end