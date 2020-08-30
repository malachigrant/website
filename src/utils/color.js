const colorRegex = /([0-9,a-f]{2})([0-9,a-f]{2})([0-9,a-f]{2})/i;

const ascii = (a) => a.charCodeAt(0);

export const hexToDec = (input) => {
  let result = 0;
  let mult = 1;
  for (let i = input.length - 1; i >= 0; i--) {
    const char = input.charCodeAt(i);
    const num = char <= ascii('9') ? char - ascii('0') : char - ascii('a') + 10;
    result += num * mult;
    mult *= 16;
  }
  return result;
};

export const getOppositeColor = (input) => {
  const rgb = input.match(colorRegex);
  const sum = hexToDec(rgb[1]) + hexToDec(rgb[2]) + hexToDec(rgb[3]);
  return sum > 255 ? '#000000' : '#ffffff';
};
