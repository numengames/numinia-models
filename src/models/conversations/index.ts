import { Schema, model, Types } from 'mongoose';

import { validateModelOrAssistant } from './validations';

interface AssistantAttributes {
  id: string;
  name: string;
}

const AssistantSchema = new Schema<AssistantAttributes>(
  {
    id: String,
    name: String,
  },
  { versionKey: false, _id: false },
);

export interface ConversationAttributes {
  type: string;
  name?: string;
  model?: string;
  origin: string;
  createdAt?: Date;
  updatedAt?: Date;
  walletId?: string;
  isActive?: boolean;
  _id?: Types.ObjectId;
  conversationId: string;
  assistant?: AssistantAttributes;
}

const schema = new Schema<ConversationAttributes>(
  {
    name: String,
    model: String,
    walletId: String,
    assistant: AssistantSchema,
    type: { type: String, required: true },
    origin: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    conversationId: { type: String, required: true },
  },
  { versionKey: false, timestamps: true },
);

schema.pre('validate', validateModelOrAssistant);

schema.index({ 'thread.id': 1 });

export const ConversationModel = model<ConversationAttributes>(
  'Conversation',
  schema,
);

export type ConversationDocument = ReturnType<
  (typeof ConversationModel)['hydrate']
>;
