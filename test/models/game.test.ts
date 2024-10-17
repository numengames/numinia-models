import createGame from '../helpers/create-game';
import { GameDocument } from '../../src/types';
import { mongoose, GameModel } from '../../src';

const testDatabase = require('../test-db')(mongoose);

describe('Game', () => {
  beforeAll(() => testDatabase.connect());

  afterAll(() => testDatabase.close());

  describe('when creating a new collect coins game', () => {
    let gameObject: GameDocument;

    beforeAll(async () => {
      gameObject = await createGame();
    });

    afterAll(() => GameModel.deleteOne({ _id: gameObject.id }));

    test('it should contain all the properties', async () => {
      const gameDocument = <GameDocument>await GameModel.findById(gameObject.id);

      expect(gameDocument._id).toBeDefined();
      expect(gameDocument.createdAt).toBeDefined();
      expect(gameDocument.updatedAt).toBeDefined();
      expect(gameDocument.name).toBe(gameObject.name);
      expect(gameDocument.origin).toBe(gameObject.origin);
      expect(gameDocument.difficulty).toBe(gameObject.difficulty);
      expect(gameDocument.averageTime).toBe(gameObject.averageTime);
      expect(gameDocument.isActive).toBe(gameObject.isActive);
      expect(gameDocument.mode).toBe(gameObject.mode);
    });
  });
});
