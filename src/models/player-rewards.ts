import mongoose, { Schema, model, Types } from 'mongoose';

import { RewardDocument } from './rewards';
import { PlayerDocument } from './players';

export interface PlayerRewardAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  _id?: Types.ObjectId;
  playerId: Types.ObjectId | PlayerDocument;
  rewardId: Types.ObjectId | RewardDocument;
}

const schema = new Schema<PlayerRewardAttributes>(
  {
    playerId: { type: String, ref: 'Player', required: true },
    rewardId: { type: Schema.Types.ObjectId, ref: 'Reward', required: true },
  },
  { versionKey: false, timestamps: true },
);

export const PlayerRewardModel =
  mongoose.models.PlayerReward || model<PlayerRewardAttributes>('PlayerReward', schema);

export type PlayerRewardDocument = ReturnType<(typeof PlayerRewardModel)['hydrate']>;
