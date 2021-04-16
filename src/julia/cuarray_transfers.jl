# converts the array to a CuArray on the GPU
a_d = CuArray([1, 2, 3, 4])

# converts the CuArray to a regular array in memory
b = Array(a_d)