import type { Config } from 'jest';

const config: Config = {
  preset: '@shelf/jest-mongodb',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/models/**', 'test/**'],
};

export default config;
