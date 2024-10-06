import { Schema, model, Types } from 'mongoose';

/**
 * Attributes for defining a session in the Numinia platform.
 */
export interface SessionAttributes {
  /**
   * The unique identifier of the player associated with this session.
   */
  playerId: Types.ObjectId;

  /**
   * The timestamp when the session started.
   */
  startAt: Date;

  /**
   * The timestamp when the session ended. If undefined, the session is still active.
   */
  endAt?: Date;
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
