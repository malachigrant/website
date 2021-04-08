function parallelAdd()
  Threads.@threads for i in eachindex(a)
    c[i] = a[i] + b[i]
  end
  return c
end