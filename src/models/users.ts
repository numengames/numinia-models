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
  user: string;
  _id?: Types.ObjectId;
  accounts: Types.Array<UserAccountAttributes>;
}

const schema = new Schema<UserAttributes>(
  {
    user: String,
    accounts: [AccountElementSchema],
  },
  { versionKey: false, timestamps: true },
);

export const UserModel = model<UserAttributes>('User', schema);

export type UserDocument = ReturnType<(typeof UserModel)['hydrate']>;
