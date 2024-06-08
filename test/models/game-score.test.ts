import { HydratedDocument } from 'mongoose';

import { GameScoreAttributes } from '../../src/interfaces';
import { GameScoreDocument } from '../../src/types';
import { mongoose, GameScoreModel } from '../../src';
import createGameScore from '../helpers/create-game-score';

const testDatabase = require('../test-db')(mongoose);

describe('GameScore', () => {
  beforeAll(() => testDatabase.connect());

  afterAll(() => testDatabase.close());

  describe('when creating a new collect coins game', () => {
    let gameScoreObject: HydratedDocument<GameScoreAttributes>;

    beforeAll(async () => {
      gameScoreObject = await createGameScore();
    });

    afterAll(() => GameScoreModel.deleteOne({ _id: gameScoreObject.id }));

    test('it should contain all the properties', async () => {
      const gameScoreDocument = <GameScoreDocument>(
        await GameScoreModel.findById(gameScoreObject.id)
      );

      expect(gameScoreDocument._id).toBeDefined();
      expect(gameScoreDocument.createdAt).toBeDefined();
      expect(gameScoreDocument.updatedAt).toBeDefined();
      expect(gameScoreDocument.mode).toBe(gameScoreObject.mode);
      expect(gameScoreDocument.score).toBe(gameScoreObject.score);
      expect(gameScoreDocument.timer).toBe(gameScoreObject.timer);
      expect(gameScoreDocument.isActive).toBe(gameScoreObject.isActive);
      expect(gameScoreDocument.walletId).toBe(gameScoreObject.walletId);
      expect(gameScoreDocument.space).toBeDefined();
      expect(gameScoreDocument.space.name).toBe(gameScoreObject.space.name);
      expect(gameScoreDocument.space.origin).toBe(gameScoreObject.space.origin);
    });
  });
});
