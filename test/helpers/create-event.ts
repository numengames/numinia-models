import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

import { EventModel } from '../../src';
import { EventAttributes } from '../../src/interfaces';

export default (params: Partial<EventAttributes>) => {
  const query: Partial<EventAttributes> = {
    timestamp: new Date(),
    triggerObjectId: faker.string.uuid(),
    playerId: new mongoose.Types.ObjectId(),
    eventType: faker.helpers.arrayElement([
      'teleport',
      'redirect',
      'move_item',
      'obtain_nft',
      'obtain_asset',
      'ai_interaction',
      'insert_password',
    ]),
    details: { info: faker.lorem.sentence() },
  };

  return EventModel.create({
    ...query,
    ...params,
  });
};
