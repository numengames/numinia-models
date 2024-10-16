import { ConversationChunkDocument, ConversationDocument } from '../../src/types';
import createConversation from '../helpers/create-conversation';
import createConversationChunk from '../helpers/create-conversation-chunk';
import { mongoose, ConversationChunkModel, ConversationModel } from '../../src';

const testDatabase = require('../test-db')(mongoose);

describe('ConversationChunks', () => {
  beforeAll(() => testDatabase.connect());

  afterAll(() => testDatabase.close());

  describe('when create a new conversation', () => {
    let conversationObject: ConversationDocument;
    let conversationChunkObject: ConversationChunkDocument;

    beforeAll(async () => {
      conversationObject = await createConversation({
        model: 'gpt-4o',
        conversationId: 'thread-1240380072355958896',
      });

      conversationChunkObject = await createConversationChunk({
        value: 'test',
        role: 'assistant',
        conversationId: conversationObject.conversationId,
      });
    });

    afterAll(() =>
      Promise.all([
        ConversationModel.deleteOne({ _id: conversationObject.id }),
        ConversationChunkModel.deleteOne({ _id: conversationChunkObject.id }),
      ]),
    );

    test('it should contain all the properties', async () => {
      const conversationChunkDocument = <ConversationChunkDocument>(
        await ConversationChunkModel.findById(conversationChunkObject.id)
      );

      expect(conversationChunkDocument._id).toBeDefined();
      expect(conversationChunkDocument.createdAt).toBeDefined();
      expect(conversationChunkDocument.updatedAt).toBeDefined();
      expect(conversationChunkDocument.role).toBe(conversationChunkObject.role);
      expect(conversationChunkDocument.format).toBe(conversationChunkObject.format);
      expect(conversationChunkDocument.value).toBe(conversationChunkObject.value);
      expect(conversationChunkDocument.conversationId.toString()).toBe(
        conversationChunkObject.conversationId.toString(),
      );
    });
  });
});
