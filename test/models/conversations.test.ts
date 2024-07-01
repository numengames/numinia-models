import { HydratedDocument } from 'mongoose';

import createPlayer from '../helpers/create-player';
import { ConversationDocument } from '../../src/types';
import { mongoose, ConversationModel, PlayerModel } from '../../src';
import createConversation from '../helpers/create-conversation';
import { ConversationAttributes, PlayerAttributes } from '../../src/interfaces';

const testDatabase = require('../test-db')(mongoose);

describe('Conversation', () => {
  beforeAll(() => testDatabase.connect());

  afterAll(() => testDatabase.close());

  describe('when create a new conversation but no model or assistant has been defined', () => {
    test('it should throw an error', async () => {
      expect(createConversation).rejects.toThrow(
        Error('ConversationError - Either model or assistant must be present'),
      );
    });
  });

  describe('when create a new conversation', () => {
    let playerObject: HydratedDocument<PlayerAttributes>;
    let conversationObject: HydratedDocument<ConversationAttributes>;

    beforeAll(async () => {
      playerObject = await createPlayer();
      conversationObject = await createConversation({
        model: 'gpt-4o',
        player: playerObject._id,
        assistant: {
          id: 'asst_loV42lYPajq6clFeuc7NUYJD',
          name: 'Test',
        },
        name: 'Test',
        conversationId: 'thread-1240380072355958896',
      });
    });

    afterAll(() =>
      Promise.all([
        PlayerModel.deleteOne({ _id: playerObject.id }),
        ConversationModel.deleteOne({ _id: conversationObject.id }),
      ]),
    );

    test('it should contain all the properties', async () => {
      const conversationDocument = <ConversationDocument>(
        await ConversationModel.findById(conversationObject.id)
      );

      expect(conversationDocument._id).toBeDefined();
      expect(conversationDocument.createdAt).toBeDefined();
      expect(conversationDocument.updatedAt).toBeDefined();
      expect(conversationDocument.player?.toString()).toBe(conversationObject.player?.toString());
      expect(conversationDocument.model).toBe(conversationObject.model);
      expect(conversationDocument.isActive).toBeTruthy();
      expect(conversationDocument.assistant).toBeDefined();
      expect(conversationDocument.assistant?.id).toBe(conversationObject.assistant?.id);
      expect(conversationDocument.assistant?.name).toBe(conversationObject.assistant?.name);
      expect(conversationDocument.conversationId).toBe(conversationObject.conversationId);
      expect(conversationDocument.name).toBe(conversationObject.name);
      expect(conversationDocument.tokensSpent).toBe(conversationObject.tokensSpent);
    });
  });
});
