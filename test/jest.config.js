const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '..'),
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{js,vue}'
  ],
  coverageDirectory: '<rootDir>/test/coverage',
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-serializer-vue'
  ]
}
