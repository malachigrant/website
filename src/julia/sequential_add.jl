a = ones(2^20)
b = ones(2^20)
c = zeros(2^20)

function add()
  for i in eachindex(a)
    c[i] = a[i] + b[i]
  end
  return c
end