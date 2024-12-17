import { faker } from '@faker-js/faker';

import { AIAgentModel } from '../../src/models/ai-agents';
import { AIAgentAttributes } from '../../src/models/ai-agents';

export default (params: Partial<AIAgentAttributes> = {}) =>
  AIAgentModel.create({
    name: faker.word.words(),
    provider: faker.company.name(),
    aiAgentId: faker.string.uuid(),
    apiKeyEnvVar: faker.internet.password({ length: 24 }),
    ...params,
  });
