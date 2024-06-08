import { faker } from '@faker-js/faker';

import { GameScoreModel } from '../../src';
import { GameScoreAttributes } from '../../src/interfaces';

export default (params: Partial<GameScoreAttributes> = {}) =>
  GameScoreModel.create({
    walletId: params.walletId || faker.finance.ethereumAddress(),
    space: {
      name: faker.word.words(),
      origin: faker.helpers.arrayElement(['oncyber', 'hyperfy', 'global']),
    },
    isActive: faker.helpers.arrayElement([true, false]),
    mode: faker.word.words(),
    score: faker.number.int({ min: 1, max: 30 }),
    timer: faker.number.int({ min: 1, max: 1000 }),
    ...params,
  });
