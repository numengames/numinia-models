import createReward from '../helpers/create-reward';

import { mongoose, RewardModel } from '../../src';
import RewardTypes from '../../src/constants/reward-types';
import {
  DigitalAssetRewardAttributes,
  InGameRewardAttributes,
  RewardAttributes,
} from '../../src/interfaces';
import { HydratedDocument } from 'mongoose';

const testDatabase = require('../test-db')(mongoose);

describe('Game', () => {
  beforeAll(() => testDatabase.connect());

  afterAll(() => testDatabase.close());

  describe(`Reward with ${RewardTypes.IN_GAME_ITEM}`, () => {
    let playerRewardObject: HydratedDocument<RewardAttributes>;

    beforeAll(async () => {
      playerRewardObject = await createReward(RewardTypes.IN_GAME_ITEM);
    });

    afterAll(() => RewardModel.deleteOne({ _id: playerRewardObject._id }));

    test(`it should contain all the properties for ${RewardTypes.IN_GAME_ITEM}`, async () => {
      const RewardDocument = <InGameRewardAttributes>(
        await RewardModel.findById(playerRewardObject._id)
      );

      expect(RewardDocument?._id).toBeDefined();
      expect(RewardDocument?.isActive).toBeDefined();
      expect(RewardDocument?.imageUrl).toBeDefined();
      expect(RewardDocument?.name).toBeDefined();
      expect(RewardDocument?.description).toBeDefined();
      expect(RewardDocument?.power).toBeDefined();
      expect(RewardDocument?.durability).toBeDefined();
      expect(RewardDocument?.rarity).toBeDefined();
      expect(RewardDocument?.type).toBe(RewardTypes.IN_GAME_ITEM);
    });
  });

  describe(`Reward with ${RewardTypes.DIGITAL_ASSET}`, () => {
    let playerRewardObject: HydratedDocument<RewardAttributes>;

    beforeAll(async () => {
      playerRewardObject = await createReward(RewardTypes.DIGITAL_ASSET);
    });

    afterAll(() => RewardModel.deleteOne({ _id: playerRewardObject._id }));

    test(`it should contain all the properties for ${RewardTypes.DIGITAL_ASSET}`, async () => {
      const RewardDocument = <DigitalAssetRewardAttributes>(
        await RewardModel.findById(playerRewardObject._id)
      );

      expect(RewardDocument?._id).toBeDefined();
      expect(RewardDocument?.isActive).toBeDefined();
      expect(RewardDocument?.imageUrl).toBeDefined();
      expect(RewardDocument?.name).toBeDefined();
      expect(RewardDocument?.description).toBeDefined();
      expect(RewardDocument?.tokenId).toBeDefined();
      expect(RewardDocument?.blockchain).toBe('Base');
      expect(RewardDocument?.contractAddress).toBeDefined();
      expect(RewardDocument?.type).toBe(RewardTypes.DIGITAL_ASSET);
    });
  });
});
