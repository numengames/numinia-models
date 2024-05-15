import { HydratedDocument } from 'mongoose';

import { AccountDocument } from '../../src/types';
import { mongoose, AccountModel } from '../../src';
import createAccount from '../helpers/create-account';
import { AccountAttributes } from '../../src/interfaces';

const testDatabase = require('../test-db')(mongoose);

describe('Account', () => {
  beforeAll(() => testDatabase.connect());

  afterAll(() => testDatabase.close());

  describe('when create a new account', () => {
    let accountObject: HydratedDocument<AccountAttributes>;

    beforeAll(async () => {
      accountObject = await createAccount();
    });

    afterAll(() => AccountModel.deleteOne({ _id: accountObject.id }));

    test('it should contain all the properties', async () => {
      const accountDocument = <AccountDocument>(
        await AccountModel.findById(accountObject.id)
      );

      expect(accountDocument._id).toBeDefined();
      expect(accountDocument.createdAt).toBeDefined();
      expect(accountDocument.updatedAt).toBeDefined();
      expect(accountDocument.password).toBe(accountObject.password);
    });
  });
});
