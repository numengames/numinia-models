import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

import { ConversationChunkModel, constants } from '../../src';
import { ConversationChunkAttributes } from '../../src/interfaces';

export default async (params: Partial<ConversationChunkAttributes>) =>
  ConversationChunkModel.create({
    value: faker.lorem.lines(1),
    format: faker.helpers.arrayElement([
      constants.ConversationChunkFormat.TEXT,
      constants.ConversationChunkFormat.AUDIO,
      constants.ConversationChunkFormat.VIDEO,
    ]),
    conversationId: new mongoose.Types.ObjectId(),
    role: faker.helpers.arrayElement(['assistant', 'user', 'system']),
    ...params,
  });
