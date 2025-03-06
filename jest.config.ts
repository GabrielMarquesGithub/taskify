import { createDefaultPreset, type JestConfigWithTsJest } from "ts-jest";

const presetConfig = createDefaultPreset({
  tsconfig: "tsconfig.json"
});

const config: JestConfigWithTsJest = {
  verbose: true,
  testEnvironment: "node",
  moduleNameMapper: {
    "^@presentation/(.*)$": "<rootDir>/src/presentation/$1",
    "^@infrastructure/(.*)$": "<rootDir>/src/infrastructure/$1",
    "^@domain/(.*)$": "<rootDir>/src/domain/$1",
    "^@application/(.*)$": "<rootDir>/src/application/$1"
  },
  ...presetConfig
};

export default config;
