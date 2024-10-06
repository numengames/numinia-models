import { Schema, model, Types } from 'mongoose';

export interface SessionAttributes {
  endAt?: Date;
  startAt: Date;
  playerId: Types.ObjectId;
}

const sessionSchema = new Schema<SessionAttributes>(
  {
    endAt: { type: Date },
    startAt: { type: Date, default: Date.now },
    playerId: { type: Schema.Types.ObjectId, required: true, ref: 'Player' },
  },
  { versionKey: false },
);

export const SessionModel = model<SessionAttributes>('Session', sessionSchema);

export type SessionDocument = ReturnType<(typeof SessionModel)['hydrate']>;
