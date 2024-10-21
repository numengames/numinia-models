import mongoose, { Schema, model, Types } from 'mongoose';

/**
 * Attributes for defining a session in the Numinia platform.
 */
export interface PlayerSessionAttributes {
  /**
   * The unique identifier of the player associated with this session.
   * It references the Player document in the database.
   */
  playerId?: Types.ObjectId;

  /**
   * Boolean to indicate if the session is anonymous.
   */
  isAnonymous: boolean;

  /**
   * The timestamp when the session started.
   * Automatically set to the current date when the session is created.
   */
  startAt: Date;

  /**
   * The timestamp when the session ended.
   * If undefined, the session is considered still active.
   */
  endAt?: Date;

  /**
   * The name of the space where the session takes place.
   * This refers to the specific virtual environment the player is interacting with.
   */
  spaceName: string;

  /**
   * Information about the user's device and browser, retrieved from the user agent string.
   * This is useful for tracking the type of device and browser used during the session.
   */
  userAgent: string;

  /**
   * The platform where the session was initiated.
   */
  platform: string;
}

const schema = new Schema<PlayerSessionAttributes>(
  {
    endAt: Date,
    platform: String,
    spaceName: String,
    userAgent: String,
    startAt: { type: Date, default: Date.now },
    isAnonymous: { type: Boolean, default: false },
    playerId: { type: Schema.Types.ObjectId, ref: 'Player' },
  },
  { versionKey: false },
);

export const PlayerSessionModel =
  mongoose.models.PlayerSession || model<PlayerSessionAttributes>('PlayerSession', schema);

export type PlayerSessionDocument = ReturnType<(typeof PlayerSessionModel)['hydrate']>;
