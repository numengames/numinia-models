import mongoose, { Schema, model, Types, Document } from 'mongoose';

import RewardTypes from '../constants/reward-types';

export interface RewardAttributes {
  name: string;
  description?: string;
  type: string;
  imageUrl: string;
  obtainableIn?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
  _id?: Types.ObjectId;
}

export interface InGameRewardAttributes extends RewardAttributes {
  power?: number;
  rarity?: string;
  durability?: string;
}

export interface DigitalAssetRewardAttributes extends RewardAttributes {
  tokenId: string;
  blockchain: string;
  contractAddress: string;
}

const rewardSchema = new Schema<RewardAttributes>(
  {
    description: String,
    obtainableIn: String,
    name: { type: String, required: true },
    type: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    imageUrl: { type: String, required: true },
  },
  { versionKey: false, timestamps: true, discriminatorKey: 'type' },
);

export const RewardModel =
  mongoose.models.Reward || model<RewardAttributes>('Reward', rewardSchema);

export const DigitalAssetRewardModel = RewardModel.discriminator<DigitalAssetRewardDocument>(
  RewardTypes.DIGITAL_ASSET,
  new Schema<DigitalAssetRewardAttributes>({
    tokenId: { type: String, required: true },
    blockchain: { type: String, required: true },
    contractAddress: { type: String, required: true },
  }),
);

export const InGameRewardModel = RewardModel.discriminator<InGameRewardDocument>(
  RewardTypes.IN_GAME_ITEM,
  new Schema<InGameRewardAttributes>({
    power: Number,
    rarity: String,
    durability: String,
  }),
);

export type RewardDocument = Document & RewardAttributes;
export type InGameRewardDocument = RewardDocument & InGameRewardAttributes;
export type DigitalAssetRewardDocument = RewardDocument & DigitalAssetRewardAttributes;
