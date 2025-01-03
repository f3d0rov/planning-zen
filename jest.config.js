/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
    "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
  },
  "transformIgnorePatterns": [
    "node_modules/(?!variables/.*)"
  ]
};