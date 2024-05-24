import { faker } from '@faker-js/faker';

import { AssistantModel } from '../../src';
import { AssistantAttributes } from '../../src/interfaces';

export default (params: Partial<AssistantAttributes> = {}) =>
  AssistantModel.create({
    discordId:
      params.discordId ||
      faker.number.int({ min: 1000000000000, max: 9999999999999 }),
    openaiId:
      params.openaiId || `asst_${faker.internet.password({ length: 24 })}`,
    name: faker.word.words(),
    ...params,
  });
