using BenchmarkTools

a = ones(2^20)
b = ones(2^20)
c = zeros(2^20)

function add()
  for i in eachindex(a)
    c[i] = a[i] + b[i]
  end
  return c
end

function parallelAdd()
  Threads.@threads for i in eachindex(a)
    c[i] = a[i] + b[i]
  end
  return c
end

function test()
  c .= a + b
  return c
end

println("Sequential")
@btime add()
println("CPU Parallel")
@btime parallelAdd()

@btime test()
return nothing