import { ConversationChunkModel, constants } from '../../src';
import { ConversationChunkAttributes } from '../../src/interfaces';

export default async (params: Partial<ConversationChunkAttributes>) =>
  ConversationChunkModel.create({
    value: params.value,
    conversationId: params.conversationId,
    type: params.type || constants.ConversationChunkType.TEXT,
  });
