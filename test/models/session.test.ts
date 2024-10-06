import { HydratedDocument } from 'mongoose';

import createPlayer from '../helpers/create-player';
import createSession from '../helpers/create-session';
import { SessionModel, PlayerModel, mongoose } from '../../src';
import { SessionDocument, PlayerDocument } from '../../src/types';

const testDatabase = require('../test-db')(mongoose);

describe('Sessions', () => {
  beforeAll(() => testDatabase.connect());

  afterAll(() => testDatabase.close());

  describe('when creating a new player', () => {
    let playerObject: HydratedDocument<PlayerDocument>;
    let sessionObject: HydratedDocument<SessionDocument>;

    beforeAll(async () => {
      playerObject = await createPlayer();
      sessionObject = await createSession({ playerId: playerObject._id });
    });

    afterAll(() =>
      Promise.all([
        PlayerModel.deleteOne({ _id: playerObject._id }),
        SessionModel.deleteOne({ playerId: sessionObject.playerId }),
      ]),
    );

    test('it should contain all the properties', async () => {
      const sessionDocument = <SessionDocument>await SessionModel.findById(sessionObject._id);

      expect(sessionDocument._id).toBeDefined();
      expect(sessionDocument.playerId).toStrictEqual(sessionObject.playerId);
      expect(sessionDocument.startAt).toStrictEqual(sessionObject.startAt);
      expect(sessionDocument.endAt).toStrictEqual(sessionObject.endAt);
    });
  });
});
