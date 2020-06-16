module.exports = {
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.js",
    "!<rootDir>/src/index.js",
    "!<rootDir>/src/jest.config.js",
    "!<rootDir>/src/middlewares/router.js",
  ],
  coverageDirectory: "<rootDir>/coverage",
  coveragePathIgnorePatterns: ["<rootDir>/packages/api/src/middlewares/router.js"],
  projects: ["<rootDir>/e2e/jest.config.js", "<rootDir>/src/jest.config.js"],
};
