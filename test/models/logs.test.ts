import { HydratedDocument } from 'mongoose';

import createLogs from '../helpers/create-logs';
import createPlayer from '../helpers/create-player';
import { LogModel, PlayerModel, mongoose } from '../../src';
import { LogDocument, PlayerDocument } from '../../src/types';

const testDatabase = require('../test-db')(mongoose);

describe('Logss', () => {
  beforeAll(() => testDatabase.connect());

  afterAll(() => testDatabase.close());

  describe('when creating a new player', () => {
    let logObject: HydratedDocument<LogDocument>;
    let playerObject: HydratedDocument<PlayerDocument>;

    beforeAll(async () => {
      playerObject = await createPlayer();
      logObject = await createLogs({ playerId: playerObject._id });
    });

    afterAll(() =>
      Promise.all([
        PlayerModel.deleteOne({ _id: playerObject._id }),
        LogModel.deleteOne({ playerId: logObject.playerId }),
      ]),
    );

    test('it should contain all the properties', async () => {
      const logDocument = <LogDocument>await LogModel.findById(logObject._id);

      expect(logDocument._id).toBeDefined();
      expect(logDocument.playerId).toStrictEqual(logObject.playerId);
      expect(logDocument.eventType).toBe(logObject.eventType);
      expect(logDocument.timestamp.toISOString()).toBe(logObject.timestamp.toISOString());
      expect(logDocument.triggerObjectId).toBe(logObject.triggerObjectId);
      expect(logDocument.details).toEqual(logObject.details);
    });
  });
});
