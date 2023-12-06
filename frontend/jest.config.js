module.exports = {
  transform: {
    '\\.js': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(png)$': '<rootDir>/__mocks__/pngMock.js',
    '\\.(jpg|jpeg|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/index.js',
    '\\.(css|scss)$': '<rootDir>/src/index.js',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
