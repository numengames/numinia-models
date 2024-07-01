import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

import { PlayerModel, constants } from '../../src';
import { PlayerAccountAttributes, PlayerAttributes } from '../../src/interfaces';

interface Params extends Partial<PlayerAttributes> {
  account?: PlayerAccountAttributes;
}

export default (params: Params = {}) => {
  const query: Partial<PlayerAttributes> = {
    accounts: [],
    lastConectionDate: new Date(),
    userName: faker.internet.userName(),
    walletId: faker.finance.ethereumAddress(),
    isActive: faker.helpers.arrayElement([true, false]),
    isBlocked: faker.helpers.arrayElement([true, false]),
  };

  if (!params.account) {
    query.accounts?.push({
      kind: constants.AccountKindTypes.INTERNAL,
      accountId: new mongoose.Types.ObjectId(),
    } as any);
  } else {
    query.accounts?.push(params.account);
  }

  return PlayerModel.create({
    ...query,
    ...params,
  });
};
