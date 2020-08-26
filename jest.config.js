// https://jestjs.io/docs/en/configuration.html

module.exports = {
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Report',
        outputPath: './test-report/index.html',
      },
    ],
  ],
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  // coveragePathIgnorePatterns: [],
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules', 'src', '__tests__'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  testRegex: '/__tests__/.*.test.(js|ts|tsx)?$',
  // setupFiles: [],
};
