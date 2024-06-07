import { faker } from '@faker-js/faker';

import { CollectCoinsModel } from '../../src';
import { CollectCoinsAttributes } from '../../src/interfaces';

export default (params: Partial<CollectCoinsAttributes> = {}) =>
  CollectCoinsModel.create({
    walletId: params.walletId || faker.finance.ethereumAddress(),
    space: {
      name: faker.word.words(),
      origin: faker.helpers.arrayElement(['oncyber', 'hyperfy', 'global']),
    },
    collectedCoins: faker.number.int({ min: 1, max: 30 }),
    timer: faker.number.int({ min: 1, max: 1000 }),
    ...params,
  });
