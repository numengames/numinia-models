import { HydratedDocument } from 'mongoose';

import { UserDocument } from '../../src/types';
import createUser from '../helpers/create-user';
import { UserAttributes } from '../../src/models/users';
import { AccountModel, UserModel, mongoose } from '../../src';

const testDatabase = require('../test-db')(mongoose);

describe('Users', () => {
  beforeAll(() => testDatabase.connect());

  afterAll(() => testDatabase.close());

  describe('when create a new user credentials', () => {
    let userObject: HydratedDocument<UserAttributes>;

    beforeAll(async () => {
      userObject = await createUser();
    });

    afterAll(() =>
      Promise.all([
        UserModel.deleteOne({ _id: userObject.id }),
        AccountModel.deleteOne(),
      ]),
    );

    test('it should contain all the properties', async () => {
      const credentialDocument = <UserDocument>(
        await UserModel.findById(userObject.id)
      );

      expect(credentialDocument._id).toBeDefined();
      expect(credentialDocument.user).toBe(userObject.user);
      expect(credentialDocument.accounts[0].kind).toBe(
        userObject.accounts[0].kind,
      );
      expect(credentialDocument.accounts[0].accountId?.toString()).toEqual(
        userObject.accounts[0].accountId?.toString(),
      );
    });
  });
});
