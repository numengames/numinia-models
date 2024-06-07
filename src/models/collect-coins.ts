import { Schema, model, Types } from 'mongoose';

interface UserAccountAttributes {
  name: string;
  origin: string;
}

const CollectCoinsSpaceElementSchema = new Schema<UserAccountAttributes>(
  {
    name: { type: String, required: true },
    origin: { type: String, required: true },
  },
  { versionKey: false, _id: false },
);

export interface CollectCoinsAttributes {
  walletId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  space: {
    name: string;
    origin: string;
  };
  _id?: Types.ObjectId;
  collectedCoins: number;
  timer: number;
}

const schema = new Schema<CollectCoinsAttributes>(
  {
    walletId: String,
    space: CollectCoinsSpaceElementSchema,
    timer: { type: Number, required: true },
    collectedCoins: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true },
);

export const CollectCoinsModel = model<CollectCoinsAttributes>(
  'CollectCoin',
  schema,
);

export type CollectCoinsDocument = ReturnType<
  (typeof CollectCoinsModel)['hydrate']
>;
