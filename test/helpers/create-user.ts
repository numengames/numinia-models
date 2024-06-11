import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

import { UserModel, constants } from '../../src';
import { UserAccountAttributes, UserAttributes } from '../../src/interfaces';

interface Params extends Partial<UserAttributes> {
  account?: UserAccountAttributes;
}

export default (params: Params = {}) => {
  const query: Partial<UserAttributes> = {
    accounts: [],
    lastConectionDate: new Date(),
    userName: faker.internet.userName(),
    wallet: faker.finance.ethereumAddress(),
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

  return UserModel.create({
    ...query,
    ...params,
  });
};
