module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-navigation|@react-native|react-native-reanimated|react-native-circular-progress)/)',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|ttf|eot|svg)$': '<rootDir>/__tests__/__mocks__/fileMock.ts',
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
  ],
  testMatch: ['**/__tests__/**/*.test.(js|jsx|ts|tsx)'],

};
