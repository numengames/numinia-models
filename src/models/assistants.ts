import mongoose, { Schema, model, Types } from 'mongoose';

export interface AssistantAttributes {
  name: string;
  openaiId: string;
  createdAt?: Date;
  updatedAt?: Date;
  discordId?: string;
  _id?: Types.ObjectId;
}

const schema = new Schema<AssistantAttributes>(
  {
    discordId: String,
    name: { type: String, required: true },
    openaiId: { type: String, required: true },
  },
  { versionKey: false, timestamps: true },
);

export const AssistantModel =
  mongoose.models.Assistant || model<AssistantAttributes>('Assistant', schema);

export type AssistantDocument = ReturnType<(typeof AssistantModel)['hydrate']>;
