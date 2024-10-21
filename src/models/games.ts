import mongoose, { Schema, model, Types } from 'mongoose';

export interface GameAttributes {
  name: string;
  mode: string;
  origin: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
  difficulty: number;
  averageTime: number;
  _id?: Types.ObjectId;
}

const schema = new Schema<GameAttributes>(
  {
    isActive: Boolean,
    name: { type: String, required: true },
    mode: { type: String, required: true },
    origin: { type: String, required: true },
    difficulty: { type: Number, required: true },
    averageTime: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true },
);

export const GameModel = mongoose.models.Game || model<GameAttributes>('Game', schema);

export type GameDocument = ReturnType<(typeof GameModel)['hydrate']>;
