using CUDA;

N = 2^10
a = ones(N)
b = ones(N)

a_d = CuArray(a)
b_d = CuArray(b)

b_d .+= a_d
return Array(b_d)