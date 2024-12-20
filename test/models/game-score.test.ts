import createGame from '../helpers/create-game';
import createPlayer from '../helpers/create-player';
import { GameDocument, GameScoreDocument, PlayerDocument } from '../../src/types';
import createGameScore from '../helpers/create-game-score';
import { mongoose, GameScoreModel, PlayerModel, GameModel } from '../../src';

const testDatabase = require('../test-db')(mongoose);

describe('GameScore', () => {
  beforeAll(() => testDatabase.connect());

  afterAll(() => testDatabase.close());

  describe('when creating a new collect coins game', () => {
    let userObject: PlayerDocument;
    let gameObject: GameDocument;
    let gameScoreObject: GameScoreDocument;

    beforeAll(async () => {
      [gameObject, userObject] = await Promise.all([createGame(), createPlayer()]);
      gameScoreObject = await createGameScore({ player: userObject._id });
    });

    afterAll(() =>
      Promise.all([
        PlayerModel.deleteOne({ _id: userObject.id }),
        GameModel.deleteOne({ _id: gameObject.id }),
        GameScoreModel.deleteOne({ _id: gameScoreObject.id }),
      ]),
    );

    test('it should contain all the properties', async () => {
      const gameScoreDocument = <GameScoreDocument>(
        await GameScoreModel.findById(gameScoreObject.id)
      );

      expect(gameScoreDocument._id).toBeDefined();
      expect(gameScoreDocument.createdAt).toBeDefined();
      expect(gameScoreDocument.updatedAt).toBeDefined();
      expect(gameScoreDocument.player?.toString()).toBe(gameScoreObject.player?.toString());
      expect(gameScoreDocument.score).toBe(gameScoreObject.score);
      expect(gameScoreDocument.timer).toBe(gameScoreObject.timer);
    });
  });
});
