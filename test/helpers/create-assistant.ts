import { faker } from '@faker-js/faker';

import { AssistantModel } from '../../src';
import { AssistantAttributes } from '../../src/interfaces';

export default (params: Partial<AssistantAttributes> = {}) =>
  AssistantModel.create({
    name: faker.word.words(),
    openaiId: faker.internet.password({ length: 24 }),
    discordId: faker.number.int({ min: 1000000000000, max: 9999999999999 }),
    ...params,
  });
