import { Schema, model, Types } from 'mongoose';

interface UserAccountAttributes {
  name: string;
  origin: string;
}

const GameScoreSpaceElementSchema = new Schema<UserAccountAttributes>(
  {
    name: { type: String, required: true },
    origin: { type: String, required: true },
  },
  { versionKey: false, _id: false },
);

export interface GameScoreAttributes {
  space: {
    name: string;
    origin: string;
  };
  mode: string;
  score: number;
  timer: number;
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
  walletId?: string;
  _id?: Types.ObjectId;
}

const schema = new Schema<GameScoreAttributes>(
  {
    walletId: String,
    isActive: Boolean,
    space: GameScoreSpaceElementSchema,
    mode: { type: String, required: true },
    timer: { type: Number, required: true },
    score: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true },
);

export const GameScoreModel = model<GameScoreAttributes>('GameScore', schema);

export type GameScoreDocument = ReturnType<(typeof GameScoreModel)['hydrate']>;
