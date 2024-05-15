import { Schema, model, Types } from 'mongoose';

export interface AccountAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  password: string;
  _id?: Types.ObjectId;
}

const schema = new Schema<AccountAttributes>(
  {
    password: String,
  },
  { versionKey: false, timestamps: true },
);

export const AccountModel = model<AccountAttributes>('Account', schema);

export type AccountDocument = ReturnType<(typeof AccountModel)['hydrate']>;
