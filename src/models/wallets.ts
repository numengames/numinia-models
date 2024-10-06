import { Schema, model, Types } from 'mongoose';

/**
 * Attributes for defining a wallet associated with a player in the Numinia platform.
 */
export interface WalletAttributes {
  /**
   * The unique identifier for the wallet (generated by MongoDB).
   */
  _id?: Types.ObjectId;

  /**
   * The unique address of the wallet (e.g., Ethereum address).
   */
  walletAddress: string;

  /**
   * The unique identifier of the player who owns this wallet.
   */
  playerId: Types.ObjectId;

  /**
   * The timestamp when the wallet was created (automatically generated by Mongoose).
   */
  createdAt?: Date;

  /**
   * The timestamp of the last update to the wallet's record (automatically generated by Mongoose).
   */
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
