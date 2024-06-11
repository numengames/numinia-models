import { faker } from '@faker-js/faker';

import { ConversationModel, constants } from '../../src';
import { ConversationAttributes } from '../../src/interfaces';

interface Params extends Partial<ConversationAttributes> {
  conversationType?: string;
}

export default async (params: Params = {}) => {
  const query: Partial<ConversationAttributes> = {
    name: faker.word.words(),
    origin: faker.helpers.arrayElement([
      constants.ConversationOrigins.WEB,
      constants.ConversationOrigins.DISCORD,
      constants.ConversationOrigins.WEBGL,
    ]),
    tokensSpent: faker.number.int({ min: 1, max: 10000 }),
    type: faker.helpers.arrayElement([constants.ConversationTypes.CHATGPT]),
  };

  return ConversationModel.create({
    ...query,
    ...params,
  });
};
