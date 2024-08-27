import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

import { PlayerRewardModel } from '../../src';
import { PlayerRewardAttributes } from '../../src/interfaces';

export default async (params: Partial<PlayerRewardAttributes>) =>
  PlayerRewardModel.create({
    walletId: faker.finance.ethereumAddress(),
    rewardId: new mongoose.Types.ObjectId(),
    ...params,
  });
