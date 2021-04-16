using CUDA

N = 2^20
a_d = CUDA.ones(Int32, N)
b_d = CUDA.ones(Int32, N)
c_d = CUDA.zeros(Int32, N)

function cuArray_add()
  CUDA.@sync c_d .= a_d .+ b_d
end