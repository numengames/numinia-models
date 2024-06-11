import { Schema, model, Types } from 'mongoose';
import { AccountAttributes } from '../interfaces';

export interface UserAccountAttributes {
  kind: string;
  accountId?: Types.ObjectId | AccountAttributes;
}

const AccountElementSchema = new Schema<UserAccountAttributes>(
  {
    kind: String,
    accountId: { type: Schema.Types.ObjectId, ref: 'Account' },
  },
  { versionKey: false, _id: false },
);

export interface UserAttributes {
  userName: string;
  isActive: boolean;
  isBlocked: boolean;
  _id?: Types.ObjectId;
  lastConectionDate: Date;
  walletList?: string[];
  accounts: UserAccountAttributes[];
}

const schema = new Schema<UserAttributes>(
  {
    userName: String,
    walletList: [String],
    accounts: [AccountElementSchema],
    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    lastConectionDate: { type: Date, default: Date.now },
  },
  { versionKey: false, timestamps: true },
);

export const UserModel = model<UserAttributes>('User', schema);

export type UserDocument = ReturnType<(typeof UserModel)['hydrate']>;
