import { faker } from '@faker-js/faker';

import { AccountModel } from '../../src';
import { AccountAttributes } from '../../src/interfaces';

export default (params: Partial<AccountAttributes> = {}) =>
  AccountModel.create({
    password: params.password || faker.internet.password(),
    ...params,
  });
