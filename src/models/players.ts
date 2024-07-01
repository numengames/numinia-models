import { Schema, model, Types } from 'mongoose';
import { AccountAttributes } from '../interfaces';

export interface PlayerAccountAttributes {
  kind: string;
  accountId?: Types.ObjectId | AccountAttributes;
}

const AccountElementSchema = new Schema<PlayerAccountAttributes>(
  {
    kind: String,
    accountId: { type: Schema.Types.ObjectId, ref: 'Account' },
  },
  { versionKey: false, _id: false },
);

export interface PlayerAttributes {
  walletId?: string;
  userName: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
  isBlocked: boolean;
  _id?: Types.ObjectId;
  lastConectionDate: Date;
  accounts: PlayerAccountAttributes[];
}

const schema = new Schema<PlayerAttributes>(
  {
    walletId: String,
    userName: String,
    accounts: [AccountElementSchema],
    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    lastConectionDate: { type: Date, default: Date.now },
  },
  { versionKey: false, timestamps: true },
);

export const PlayerModel = model<PlayerAttributes>('Player', schema);

export type PlayerDocument = ReturnType<(typeof PlayerModel)['hydrate']>;
