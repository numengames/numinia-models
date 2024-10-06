import { HydratedDocument } from 'mongoose';

import createWallet from '../helpers/create-wallet';
import createPlayer from '../helpers/create-player';
import { WalletModel, PlayerModel, mongoose } from '../../src';
import { WalletDocument, PlayerDocument } from '../../src/types';

const testDatabase = require('../test-db')(mongoose);

describe('Wallets', () => {
  beforeAll(() => testDatabase.connect());

  afterAll(() => testDatabase.close());

  describe('when creating a new player', () => {
    let playerObject: HydratedDocument<PlayerDocument>;
    let walletObject: HydratedDocument<WalletDocument>;

    beforeAll(async () => {
      playerObject = await createPlayer();
      walletObject = await createWallet({ playerId: playerObject._id });
    });

    afterAll(() =>
      Promise.all([
        PlayerModel.deleteOne({ _id: playerObject._id }),
        WalletModel.deleteOne({ playerId: walletObject.playerId }),
      ]),
    );

    test('it should contain all the properties', async () => {
      const walletDocument = <WalletDocument>await WalletModel.findById(walletObject._id);

      expect(walletDocument._id).toBeDefined();
      expect(walletDocument.playerId).toStrictEqual(walletObject.playerId);
      expect(walletDocument.walletAddress).toBe(walletObject.walletAddress);
      expect(walletDocument.createdAt).toBeDefined();
      expect(walletDocument.updatedAt).toBeDefined();
    });
  });
});
