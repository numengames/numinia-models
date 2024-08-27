import { faker } from '@faker-js/faker';

import { RewardModel } from '../../src';
import RewardTypes from '../../src/constants/reward-types';
import { InGameRewardAttributes, DigitalAssetRewardAttributes, RewardAttributes } from '../../src/interfaces';

export default async (rewardType = RewardTypes.DIGITAL_ASSET, params: Partial<RewardAttributes> = {}) => {
  const discriminatorParams: InGameRewardAttributes | DigitalAssetRewardAttributes | Record<string, unknown> =
    {};

  if (rewardType === RewardTypes.DIGITAL_ASSET) {
    Object.assign(discriminatorParams, {
      blockchain: 'Base',
      tokenId: faker.string.uuid(),
      type: RewardTypes.DIGITAL_ASSET,
      contractAddress: faker.finance.ethereumAddress(),
    });
  } else if (rewardType === RewardTypes.IN_GAME_ITEM) {
    Object.assign(discriminatorParams, {
      type: RewardTypes.IN_GAME_ITEM,
      power: faker.number.int({ min: 1, max: 100 }),
      durability: faker.number.int({ min: 1, max: 100 }),
      rarity: faker.helpers.arrayElement(['common', 'rare', 'epic']),
    });
  }

  return await RewardModel.create({
    isActive: true,
    imageUrl: faker.image.url(),
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    ...discriminatorParams,
    ...params,
  });
};
