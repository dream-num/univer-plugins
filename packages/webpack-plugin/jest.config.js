module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  coveragePathIgnorePatterns: [
    'index.ts',
  ],
  testPathIgnorePatterns: ['/node_modules/', '\\.d\\.ts$', '.js$'],
  unmockedModulePathPatterns: [
    '../../node_modules',
  ],
}
