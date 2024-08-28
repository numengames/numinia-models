import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

import { PlayerRewardModel } from '../../src';
import { PlayerRewardAttributes } from '../../src/interfaces';

export default async (params: Partial<PlayerRewardAttributes>) =>
  PlayerRewardModel.create({
    playerId: new mongoose.Types.ObjectId(),
    walletId: faker.finance.ethereumAddress(),
    ...params,
  });
