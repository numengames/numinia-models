import createPlayer from '../helpers/create-player';
import createPlayerSession from '../helpers/create-player-session';
import { PlayerSessionModel, PlayerModel, mongoose } from '../../src';
import { PlayerSessionDocument, PlayerDocument } from '../../src/types';

const testDatabase = require('../test-db')(mongoose);

describe('player-session', () => {
  beforeAll(() => testDatabase.connect());

  afterAll(() => testDatabase.close());

  describe('when creating a new player', () => {
    let playerObject: PlayerDocument;
    let playerSessionObject: PlayerSessionDocument;

    beforeAll(async () => {
      playerObject = await createPlayer();
      playerSessionObject = await createPlayerSession({
        platform: 'PC',
        isAnonymous: true,
        playerId: playerObject._id,
      });
    });

    afterAll(() =>
      Promise.all([
        PlayerModel.deleteOne({ _id: playerObject._id }),
        PlayerSessionModel.deleteOne({ playerId: playerSessionObject.playerId }),
      ]),
    );

    test('it should contain all the properties', async () => {
      const playerSessionDocument = <PlayerSessionDocument>(
        await PlayerSessionModel.findById(playerSessionObject._id)
      );

      expect(playerSessionDocument._id).toBeDefined();
      expect(playerSessionDocument.platform).toBe(playerSessionObject.platform);
      expect(playerSessionDocument.userAgent).toBe(playerSessionObject.userAgent);
      expect(playerSessionDocument.spaceName).toBe(playerSessionObject.spaceName);
      expect(playerSessionDocument.endAt).toStrictEqual(playerSessionObject.endAt);
      expect(playerSessionDocument.isAnonymous).toBe(playerSessionObject.isAnonymous);
      expect(playerSessionDocument.startAt).toStrictEqual(playerSessionObject.startAt);
      expect(playerSessionDocument.playerId).toStrictEqual(playerSessionObject.playerId);
    });
  });
});
