import { Schema, model, Types } from 'mongoose';

export interface GameScoreAttributes {
  score: number;
  timer: number;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: Types.ObjectId;
  game: Types.ObjectId;
  user?: Types.ObjectId;
}

const schema = new Schema<GameScoreAttributes>(
  {
    timer: { type: Number, required: true },
    score: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    game: { type: Schema.Types.ObjectId, required: true, ref: 'Game' },
  },
  { versionKey: false, timestamps: true },
);

schema.index({ game: 1 });
schema.index({ user: 1 }, { sparse: true });

export const GameScoreModel = model<GameScoreAttributes>('GameScore', schema);

export type GameScoreDocument = ReturnType<(typeof GameScoreModel)['hydrate']>;
