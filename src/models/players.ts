import { Schema, model, Types } from 'mongoose';
export interface PlayerAttributes {
  _id?: Types.ObjectId;
  playerName: string;
  oncyberId?: string;
  hyperfyId?: string;
  isActive: boolean;
  isBlocked: boolean;
  lastConnectionDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<PlayerAttributes>(
  {
    playerName: { type: String, required: true, trim: true },
    oncyberId: { type: String, unique: true, sparse: true },
    hyperfyId: { type: String, unique: true, sparse: true },
    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    lastConnectionDate: { type: Date, default: Date.now },
  },
  { versionKey: false, timestamps: true },
);

schema.index({ oncyberId: 1 }, { unique: true, sparse: true });
schema.index({ hyperfyId: 1 }, { unique: true, sparse: true });

export const PlayerModel = model<PlayerAttributes>('Player', schema);

export type PlayerDocument = ReturnType<(typeof PlayerModel)['hydrate']>;
