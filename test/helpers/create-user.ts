import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

import { UserModel, constants } from '../../src';
import { UserAttributes } from '../../src/interfaces';

interface Params extends Partial<UserAttributes> {
  accountId?: mongoose.Types.ObjectId;
}

export default (params: Params = {}) => {
  const query = {
    user: faker.internet.userName(),
    accounts: [
      {
        accountId: params.accountId || new mongoose.Types.ObjectId(),
        kind: constants.AccountKindTypes.INTERNAL,
      },
    ],
  };

  return UserModel.create({
    ...query,
    ...params,
  });
};
