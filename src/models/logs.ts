import { Schema, model, Types } from 'mongoose';

export interface LogAttributes {
  details?: any;
  timestamp: Date;
  eventType: string;
  triggerObjectId: string;
  playerId: Types.ObjectId;
}

const schema = new Schema<LogAttributes>(
  {
    triggerObjectId: String,
    details: Schema.Types.Mixed,
    eventType: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    playerId: { type: Schema.Types.ObjectId, required: true, ref: 'Player' },
  },
  { versionKey: false },
);

export const LogModel = model<LogAttributes>('Log', schema);

export type LogDocument = ReturnType<(typeof LogModel)['hydrate']>;
