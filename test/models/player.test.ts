import { HydratedDocument } from 'mongoose';

import { PlayerDocument } from '../../src/types';
import { PlayerModel, mongoose } from '../../src';
import createPlayer from '../helpers/create-player';

const testDatabase = require('../test-db')(mongoose);

describe('Players', () => {
  beforeAll(() => testDatabase.connect());

  afterAll(() => testDatabase.close());

  describe('when creating a new player', () => {
    let playerObject: HydratedDocument<PlayerDocument>;

    beforeAll(async () => {
      playerObject = await createPlayer();
    });

    afterAll(() => PlayerModel.deleteOne({ _id: playerObject._id }));

    test('it should contain all the properties', async () => {
      const playerDocument = <PlayerDocument>await PlayerModel.findById(playerObject._id);

      expect(playerDocument._id).toBeDefined();
      expect(playerDocument.createdAt).toBeDefined();
      expect(playerDocument.updatedAt).toBeDefined();
      expect(playerDocument.isActive).toBe(playerObject.isActive);
      expect(playerDocument.oncyberId).toBe(playerObject.oncyberId);
      expect(playerDocument.hyperfyId).toBe(playerObject.hyperfyId);
      expect(playerDocument.isBlocked).toBe(playerObject.isBlocked);
      expect(playerDocument.playerName).toBe(playerObject.playerName);
      expect(playerDocument.lastConnectionDate.toString()).toBe(playerObject.lastConnectionDate.toString());
    });
  });
});
