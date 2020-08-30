import { hexToDec } from 'utils/color';

const hexToDecCases = [
  ['0', 0],
  ['ff', 255],
  ['0000ff', 255],
  ['123', 291],
];

describe('Color', () => {
  it.each(hexToDecCases)('Hexadecimal %p -> Decimal %p', (input, output) => {
    expect(hexToDec(input)).toBe(output);
  });
});
