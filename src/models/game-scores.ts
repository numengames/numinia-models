import { Schema, model, Types } from 'mongoose';

export interface GameScoreAttributes {
  timer: number;
  score?: number;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: Types.ObjectId;
  game: Types.ObjectId;
  player?: Types.ObjectId;
}

const schema = new Schema<GameScoreAttributes>(
  {
    score: Number,
    timer: { type: Number, required: true },
    player: { type: Schema.Types.ObjectId, ref: 'Player' },
    game: { type: Schema.Types.ObjectId, required: true, ref: 'Game' },
  },
  { versionKey: false, timestamps: true },
);

schema.index({ game: 1 });
schema.index({ player: 1 }, { sparse: true });

export const GameScoreModel = model<GameScoreAttributes>('GameScore', schema);

export type GameScoreDocument = ReturnType<(typeof GameScoreModel)['hydrate']>;
