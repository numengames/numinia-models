import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

import { WalletModel } from '../../src';
import { WalletAttributes } from '../../src/interfaces';

export default (params: Partial<WalletAttributes> = {}) => {
  const query: Partial<WalletAttributes> = {
    playerId: new mongoose.Types.ObjectId(),
    walletAddress: faker.finance.ethereumAddress(),
  };

  return WalletModel.create({
    ...query,
    ...params,
  });
};
