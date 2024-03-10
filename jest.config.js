module.export = {
    verbose: true ,
    testMatch: [
        "**/test/**/*.test.js"
    ],
    moduleNameMapper: {
        '^axios$': require.resolve('axios'),
    },
    transformIgnorePatterns: [
        "/node_modules/(?!(foo|bar)/)"
      ],
      "transform": {
        "\\.[jt]sx?$": "babel-jest"
      },
      // preset: 'ts-jest/presets/js-with-ts',
      testEnvironment: 'jsdom'
};