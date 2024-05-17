import { Schema, model, Types } from 'mongoose';

export interface ConversationChunkAttributes {
  type: string;
  value: string;
  format: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: Types.ObjectId;
  conversationId: Types.ObjectId;
}

const schema = new Schema<ConversationChunkAttributes>(
  {
    conversationId: {
      required: true,
      ref: 'Conversation',
      type: Schema.Types.ObjectId,
    },
    type: { type: String, required: true },
    value: { type: String, required: true },
    format: { type: String, required: true },
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
