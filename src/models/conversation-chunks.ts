import mongoose, { Schema, model, Types } from 'mongoose';

export interface ConversationChunkAttributes {
  role: string;
  value: string;
  format: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: Types.ObjectId;
  conversationId: string;
}

const schema = new Schema<ConversationChunkAttributes>(
  {
    conversationId: {
      type: String,
      required: true,
      ref: 'Conversation',
    },
    role: { type: String, required: true },
    value: { type: String, required: true },
    format: { type: String, required: true },
  },
  { versionKey: false, timestamps: true },
);

export const ConversationChunkModel =
  mongoose.models.ConversationChunk ||
  model<ConversationChunkAttributes>('ConversationChunk', schema);

export type ConversationChunkDocument = ReturnType<(typeof ConversationChunkModel)['hydrate']>;
