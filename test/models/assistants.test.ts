import { HydratedDocument } from 'mongoose';

import { AssistantDocument } from '../../src/types';
import { mongoose, AssistantModel } from '../../src';
import createAssistant from '../helpers/create-assistant';
import { AssistantAttributes } from '../../src/interfaces';

const testDatabase = require('../test-db')(mongoose);

describe('Assistant', () => {
  beforeAll(() => testDatabase.connect());

  afterAll(() => testDatabase.close());

  describe('when create a new assistant', () => {
    let assistantObject: HydratedDocument<AssistantAttributes>;

    beforeAll(async () => {
      assistantObject = await createAssistant();
    });

    afterAll(() => AssistantModel.deleteOne({ _id: assistantObject.id }));

    test('it should contain all the properties', async () => {
      const assistantDocument = <AssistantDocument>(
        await AssistantModel.findById(assistantObject.id)
      );

      expect(assistantDocument._id).toBeDefined();
      expect(assistantDocument.createdAt).toBeDefined();
      expect(assistantDocument.updatedAt).toBeDefined();
      expect(assistantDocument.name).toBe(assistantObject.name);
      expect(assistantDocument.openaiId).toBe(assistantObject.openaiId);
      expect(assistantDocument.discordId).toBe(assistantObject.discordId);
    });
  });
});
