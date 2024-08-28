import { HydratedDocument } from 'mongoose';

import { RewardAttributes, PlayerRewardAttributes, PlayerAttributes } from '../../src/interfaces';
import { PlayerRewardDocument } from '../../src/types';
import createReward from '../helpers/create-reward';
import createPlayer from '../helpers/create-player';
import rewardTypes from '../../src/constants/reward-types';
import createPlayerReward from '../helpers/create-player-reward';
import { mongoose, PlayerModel, PlayerRewardModel, RewardModel } from '../../src';

const testDatabase = require('../test-db')(mongoose);

describe('PlayerReward', () => {
  beforeAll(() => testDatabase.connect());

  afterAll(() => testDatabase.close());

  describe('when create a new player reward', () => {
    let playerObject: HydratedDocument<PlayerAttributes>;
    let rewardObject: HydratedDocument<RewardAttributes>;
    let playerRewardObject: HydratedDocument<PlayerRewardAttributes>;

    beforeAll(async () => {
      playerObject = await createPlayer();
      rewardObject = await createReward(rewardTypes.IN_GAME_ITEM);

      playerRewardObject = await createPlayerReward({
        rewardId: rewardObject._id,
        playerId: playerObject._id,
      });
    });

    afterAll(() =>
      Promise.all([
        RewardModel.deleteOne({ _id: rewardObject.id }),
        PlayerModel.deleteOne({ _id: playerObject.id }),
        PlayerRewardModel.deleteOne({ _id: playerRewardObject.id }),
      ]),
    );

    test('it should contain all the properties', async () => {
      const playerRewardDocument = <PlayerRewardDocument>(
        await PlayerRewardModel.findById(playerRewardObject.id)
      );

      expect(playerRewardDocument._id).toBeDefined();
      expect(playerRewardDocument.createdAt).toBeDefined();
      expect(playerRewardDocument.updatedAt).toBeDefined();
      expect(playerRewardDocument.playerId).toBeDefined();
      expect(playerRewardDocument.rewardId.toString()).toBe(rewardObject._id.toString());
    });
  });
});
