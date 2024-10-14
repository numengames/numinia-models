import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

import { PlayerSessionModel } from '../../src';
import { PlayerSessionAttributes } from '../../src/interfaces';

export default (params: Partial<PlayerSessionAttributes>) => {
  const query: Partial<PlayerSessionAttributes> = {
    endAt: new Date(),
    startAt: new Date(),
    userAgent: faker.internet.userAgent(),
    playerId: new mongoose.Types.ObjectId(),
    spaceName: faker.lorem.words(3).replace(' ', '_'),
    platform: faker.helpers.arrayElement(['Mobile', 'PC']),
    isAnonymous: faker.helpers.arrayElement([true, false]),
  };

  return PlayerSessionModel.create({
    ...query,
    ...params,
  });
};
