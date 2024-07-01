import { HydratedDocument } from 'mongoose';

import { PlayerDocument } from '../../src/types';
import createPlayer from '../helpers/create-player';
import createAccount from '../helpers/create-account';
import { AccountModel, PlayerModel, constants, mongoose } from '../../src';
import { PlayerAttributes, AccountAttributes } from '../../src/interfaces';

const testDatabase = require('../test-db')(mongoose);

describe('Users', () => {
  beforeAll(() => testDatabase.connect());

  afterAll(() => testDatabase.close());

  describe('when create a new user credentials', () => {
    let playerObject: HydratedDocument<PlayerAttributes>;
    let accountObject: HydratedDocument<AccountAttributes>;

    beforeAll(async () => {
      accountObject = await createAccount();
      playerObject = await createPlayer({
        account: {
          accountId: accountObject._id,
          kind: constants.AccountKindTypes.INTERNAL,
        },
      });
    });

    afterAll(() =>
      Promise.all([
        PlayerModel.deleteOne({ _id: playerObject.id }),
        AccountModel.deleteOne({ _id: accountObject.id }),
      ]),
    );

    test('it should contain all the properties', async () => {
      const credentialDocument = <PlayerDocument>await PlayerModel.findById(playerObject.id);

      expect(credentialDocument._id).toBeDefined();
      expect(credentialDocument.walletId).toBe(playerObject.walletId);
      expect(credentialDocument.userName).toBe(playerObject.userName);
      expect(credentialDocument.isActive).toBe(playerObject.isActive);
      expect(credentialDocument.isActive).toBe(playerObject.isActive);
      expect(credentialDocument.isBlocked).toBe(playerObject.isBlocked);
      expect(credentialDocument.accounts).toHaveLength(1);
      expect(credentialDocument.lastConectionDate.toString()).toBe(playerObject.lastConectionDate.toString());
      expect(credentialDocument.accounts[0].kind).toBe(playerObject.accounts[0].kind);
      expect(credentialDocument.accounts[0].accountId?.toString()).toEqual(
        playerObject.accounts[0].accountId?.toString(),
      );
    });
  });
});
