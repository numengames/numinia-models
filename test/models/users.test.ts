import { HydratedDocument } from 'mongoose';

import { UserDocument } from '../../src/types';
import createUser from '../helpers/create-user';
import createAccount from '../helpers/create-account';
import { AccountModel, UserModel, constants, mongoose } from '../../src';
import { UserAttributes, AccountAttributes } from '../../src/interfaces';

const testDatabase = require('../test-db')(mongoose);

describe('Users', () => {
  beforeAll(() => testDatabase.connect());

  afterAll(() => testDatabase.close());

  describe('when create a new user credentials', () => {
    let userObject: HydratedDocument<UserAttributes>;
    let accountObject: HydratedDocument<AccountAttributes>;

    beforeAll(async () => {
      accountObject = await createAccount();
      userObject = await createUser({
        account: {
          accountId: accountObject._id,
          kind: constants.AccountKindTypes.INTERNAL,
        },
      });
    });

    afterAll(() =>
      Promise.all([
        UserModel.deleteOne({ _id: userObject.id }),
        AccountModel.deleteOne({ _id: accountObject.id }),
      ]),
    );

    test('it should contain all the properties', async () => {
      const credentialDocument = <UserDocument>await UserModel.findById(userObject.id);

      expect(credentialDocument._id).toBeDefined();
      expect(credentialDocument.walletId).toBe(userObject.walletId);
      expect(credentialDocument.userName).toBe(userObject.userName);
      expect(credentialDocument.isActive).toBe(userObject.isActive);
      expect(credentialDocument.isActive).toBe(userObject.isActive);
      expect(credentialDocument.isBlocked).toBe(userObject.isBlocked);
      expect(credentialDocument.accounts).toHaveLength(1);
      expect(credentialDocument.lastConectionDate.toString()).toBe(userObject.lastConectionDate.toString());
      expect(credentialDocument.accounts[0].kind).toBe(userObject.accounts[0].kind);
      expect(credentialDocument.accounts[0].accountId?.toString()).toEqual(
        userObject.accounts[0].accountId?.toString(),
      );
    });
  });
});
