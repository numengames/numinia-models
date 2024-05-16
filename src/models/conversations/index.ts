import { Schema, model, Types } from 'mongoose';

import { validateModelOrAssistant } from './validations';

interface ThreadAttributes {
  id: string;
  name?: string;
}

const ThreadSchema = new Schema<ThreadAttributes>(
  {
    id: String,
    name: String,
  },
  { versionKey: false, _id: false },
);

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
  model?: string;
  origin: string;
  createdAt?: Date;
  updatedAt?: Date;
  walletId?: string;
  _id?: Types.ObjectId;
  thread: ThreadAttributes;
  assistant?: AssistantAttributes;
}

const schema = new Schema<ConversationAttributes>(
  {
    model: String,
    walletId: String,
    thread: ThreadSchema,
    assistant: AssistantSchema,
    type: { type: String, required: true },
    origin: { type: String, required: true },
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
