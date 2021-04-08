using CUDA, BenchmarkTools
const MAX_THREADS_PER_BLOCK = CUDA.attribute(CUDA.CuDevice(0), CUDA.DEVICE_ATTRIBUTE_MAX_THREADS_PER_BLOCK)
N = 2^20
a_d = CUDA.ones(Int32, N)
b_d = CUDA.ones(Int32, N)
c_d = CUDA.zeros(Int32, N)

function cuArray_add()
  CUDA.@sync c_d .= a_d .+ b_d
  return nothing
end

function kernel_add(x_d, y_d, z_d, N)
  id = (blockIdx().x - 1) * blockDim().x + threadIdx().x
  if (id > N)
    return nothing
  end
  z_d[id] = x_d[id] + y_d[id]
  return nothing
end

function cuda_add()
  @cuda blocks=cld(N, MAX_THREADS_PER_BLOCK) threads=MAX_THREADS_PER_BLOCK kernel_add(a_d, b_d, c_d, N)
  synchronize()
end

println("CuArrays")
@btime cuArray_add()
println("Kernel (1)")
@btime cuda_add()
c_d