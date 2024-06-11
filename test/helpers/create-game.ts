import { faker } from '@faker-js/faker';

import { GameModel } from '../../src';
import { GameAttributes } from '../../src/interfaces';

export default (params: Partial<GameAttributes> = {}) =>
  GameModel.create({
    name: faker.word.words(),
    origin: faker.helpers.arrayElement(['oncyber', 'hyperfy', 'global']),
    difficulty: faker.number.int({ min: 1, max: 10 }),
    averageTime: faker.number.int({ min: 1, max: 999 }),
    isActive: faker.helpers.arrayElement([true, false]),
    mode: faker.word.words(),
    ...params,
  });
