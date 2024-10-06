import { Schema, model, Types } from 'mongoose';

export interface WalletAttributes {
  _id?: Types.ObjectId;
  walletAddress: string;
  playerId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<WalletAttributes>(
  {
    playerId: { type: Schema.Types.ObjectId, required: true, ref: 'Player' },
    walletAddress: { type: String, required: true, unique: true },
  },
  { versionKey: false, timestamps: true },
);

schema.index({ walletAddress: 1 }, { unique: true });

export const WalletModel = model<WalletAttributes>('Wallet', schema);

export type WalletDocument = ReturnType<(typeof WalletModel)['hydrate']>;
