import createEvent from '../helpers/create-event';
import createPlayer from '../helpers/create-player';
import { EventModel, PlayerModel, mongoose } from '../../src';
import { EventDocument, PlayerDocument } from '../../src/types';

const testDatabase = require('../test-db')(mongoose);

describe('Events', () => {
  beforeAll(() => testDatabase.connect());

  afterAll(() => testDatabase.close());

  describe('when creating a new player', () => {
    let eventObject: EventDocument;
    let playerObject: PlayerDocument;

    beforeAll(async () => {
      playerObject = await createPlayer();
      eventObject = await createEvent({ playerId: playerObject._id });
    });

    afterAll(() =>
      Promise.all([
        PlayerModel.deleteOne({ _id: playerObject._id }),
        EventModel.deleteOne({ playerId: eventObject.playerId }),
      ]),
    );

    test('it should contain all the properties', async () => {
      const eventDocument = <EventDocument>await EventModel.findById(eventObject._id);

      expect(eventDocument._id).toBeDefined();
      expect(eventDocument.playerId).toStrictEqual(eventObject.playerId);
      expect(eventDocument.eventType).toBe(eventObject.eventType);
      expect(eventDocument.timestamp.toISOString()).toBe(eventObject.timestamp.toISOString());
      expect(eventDocument.triggerObjectId).toBe(eventObject.triggerObjectId);
      expect(eventDocument.details).toEqual(eventObject.details);
    });
  });
});
