module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: ['js', 'json', 'jsx'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  moduleDirectories: ['node_modules', 'src', 'tests'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': '<rootDir>/tests/__mocks__/fileMock.js',
  },
};
