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
  isActive?: boolean;
  tokensSpent?: number;
  _id?: Types.ObjectId;
  user?: Types.ObjectId;
  conversationId: string;
  assistant?: AssistantAttributes;
}

const schema = new Schema<ConversationAttributes>(
  {
    name: String,
    model: String,
    assistant: AssistantSchema,
    type: { type: String, required: true },
    origin: { type: String, required: true },
    tokensSpent: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    conversationId: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { versionKey: false, timestamps: true },
);

schema.pre('validate', validateModelOrAssistant);

schema.index({ conversationId: 1 });

export const ConversationModel = model<ConversationAttributes>('Conversation', schema);

export type ConversationDocument = ReturnType<(typeof ConversationModel)['hydrate']>;
