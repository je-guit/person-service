module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFiles: ['<rootDir>/test/setup/set-env-vars.ts'],
  resetMocks: true,
  coveragePathIgnorePatterns: [
    'test',
  ],
};
