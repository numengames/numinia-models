import mongoose, { Schema, model, Types } from 'mongoose';

/**
 * Attributes for logging in-game events in the Numinia platform.
 */
export interface EventAttributes {
  /**
   * The unique identifier of the player associated with this event entry.
   */
  playerId: Types.ObjectId;

  /**
   * The type of event being logged (e.g., teleport, redirect, interaction with AI, etc.).
   */
  eventType:
    | 'teleport'
    | 'redirect'
    | 'insert_password'
    | 'move_item'
    | 'ai_interaction'
    | 'obtain_nft'
    | 'obtain_asset'
    | string;

  /**
   * The timestamp when the event occurred.
   */
  timestamp: Date;

  /**
   * The unique identifier of the object that triggered the event, typically from Oncyber or Hyperfy.
   */
  triggerObjectId?: string;

  /**
   * Additional details specific to the event being logged, such as coordinates, success status, or interaction results.
   */
  details?: any;
}

const schema = new Schema<EventAttributes>(
  {
    triggerObjectId: String,
    details: Schema.Types.Mixed,
    eventType: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    playerId: { type: Schema.Types.ObjectId, required: true, ref: 'Player' },
  },
  { versionKey: false },
);

export const EventModel = mongoose.models.Event || model<EventAttributes>('Event', schema);

export type EventDocument = ReturnType<(typeof EventModel)['hydrate']>;
