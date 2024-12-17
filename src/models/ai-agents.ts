import mongoose, { Schema, model, Types } from 'mongoose';

export interface AIAgentAttributes {
  name: string;
  provider: string;
  createdAt?: Date;
  updatedAt?: Date;
  aiAgentId: string;
  _id?: Types.ObjectId;
  apiKeyEnvVar: string;
}

const baseSchema = new Schema<AIAgentAttributes>(
  {
    apiKeyEnvVar: { type: String },
    name: { type: String, required: true },
    provider: { type: String, required: true },
    aiAgentId: { type: String, required: true },
  },
  { versionKey: false, timestamps: true },
);

export const AIAgentModel =
  mongoose.models.AIAgent || model<AIAgentAttributes>('AIAgent', baseSchema);

export const OpenAIAgentModel = AIAgentModel.discriminator(
  'OpenAIAgent',
  new Schema({}, { discriminatorKey: 'provider' }),
);

export type AIAgentDocument = ReturnType<(typeof AIAgentModel)['hydrate']>;
