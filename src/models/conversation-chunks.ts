import { Schema, model, Types } from 'mongoose';

export interface ConversationChunkAttributes {
  type: string;
  value: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: Types.ObjectId;
  conversationId: Types.ObjectId;
}

const schema = new Schema<ConversationChunkAttributes>(
  {
    type: String,
    value: String,
    conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation' },
  },
  { versionKey: false, timestamps: true },
);

export const ConversationChunkModel = model<ConversationChunkAttributes>(
  'ConversationChunk',
  schema,
);

export type ConversationChunkDocument = ReturnType<
  (typeof ConversationChunkModel)['hydrate']
>;
