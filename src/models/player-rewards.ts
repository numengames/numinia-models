import { Schema, model, Types } from 'mongoose';

import { RewardDocument } from './rewards';

export interface PlayerRewardAttributes {
  walletId: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: Types.ObjectId;
  rewardId: Types.ObjectId | RewardDocument;
}

const schema = new Schema<PlayerRewardAttributes>(
  {
    walletId: { type: String, required: true },
    rewardId: { type: Schema.Types.ObjectId, ref: 'Reward', required: true },
  },
  { versionKey: false, timestamps: true },
);

export const PlayerRewardModel = model<PlayerRewardAttributes>('PlayerReward', schema);

export type PlayerRewardDocument = ReturnType<(typeof PlayerRewardModel)['hydrate']>;
