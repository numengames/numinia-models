import { ConversationChunkModel, constants } from '../../src';
import { ConversationChunkAttributes } from '../../src/interfaces';

export default async (params: Partial<ConversationChunkAttributes>) =>
  ConversationChunkModel.create({
    role: params.role,
    value: params.value,
    conversationId: params.conversationId,
    format: params.format || constants.ConversationChunkFormat.TEXT,
  });
