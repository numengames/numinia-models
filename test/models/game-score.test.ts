import { HydratedDocument } from 'mongoose';

import { GameAttributes, UserAttributes, GameScoreAttributes } from '../../src/interfaces';
import createGame from '../helpers/create-game';
import createUser from '../helpers/create-user';
import { GameScoreDocument } from '../../src/types';
import createGameScore from '../helpers/create-game-score';
import { mongoose, GameScoreModel, UserModel, GameModel } from '../../src';

const testDatabase = require('../test-db')(mongoose);

describe('GameScore', () => {
  beforeAll(() => testDatabase.connect());

  afterAll(() => testDatabase.close());

  describe('when creating a new collect coins game', () => {
    let userObject: HydratedDocument<UserAttributes>;
    let gameObject: HydratedDocument<GameAttributes>;
    let gameScoreObject: HydratedDocument<GameScoreAttributes>;

    beforeAll(async () => {
      [gameObject, userObject] = await Promise.all([createGame(), createUser()]);
      gameScoreObject = await createGameScore({ user: userObject._id });
    });

    afterAll(() =>
      Promise.all([
        UserModel.deleteOne({ _id: userObject.id }),
        GameModel.deleteOne({ _id: gameObject.id }),
        GameScoreModel.deleteOne({ _id: gameScoreObject.id }),
      ]),
    );

    test('it should contain all the properties', async () => {
      const gameScoreDocument = <GameScoreDocument>await GameScoreModel.findById(gameScoreObject.id);

      expect(gameScoreDocument._id).toBeDefined();
      expect(gameScoreDocument.createdAt).toBeDefined();
      expect(gameScoreDocument.updatedAt).toBeDefined();
      expect(gameScoreDocument.user?.toString()).toBe(gameScoreObject.user?.toString());
      expect(gameScoreDocument.score).toBe(gameScoreObject.score);
      expect(gameScoreDocument.timer).toBe(gameScoreObject.timer);
    });
  });
});
