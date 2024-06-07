import { HydratedDocument } from 'mongoose';

import { CollectCoinsAttributes } from '../../src/interfaces';
import { CollectCoinsDocument } from '../../src/types';
import { mongoose, CollectCoinsModel } from '../../src';
import createCollectCoins from '../helpers/collect-coins';

const testDatabase = require('../test-db')(mongoose);

describe('CollectCoins', () => {
  beforeAll(() => testDatabase.connect());

  afterAll(() => testDatabase.close());

  describe('when creating a new collect coins game', () => {
    let collectCoinsObject: HydratedDocument<CollectCoinsAttributes>;

    beforeAll(async () => {
      collectCoinsObject = await createCollectCoins();
    });

    // afterAll(() => CollectCoinsModel.deleteOne({ _id: collectCoinsObject.id }));

    test('it should contain all the properties', async () => {
      const collectCoinsDocument = <CollectCoinsDocument>(
        await CollectCoinsModel.findById(collectCoinsObject.id)
      );

      expect(collectCoinsDocument._id).toBeDefined();
      expect(collectCoinsDocument.createdAt).toBeDefined();
      expect(collectCoinsDocument.updatedAt).toBeDefined();
      expect(collectCoinsDocument.walletId).toBe(collectCoinsObject.walletId);
      expect(collectCoinsDocument.space).toBeDefined();
      expect(collectCoinsDocument.space.name).toBe(
        collectCoinsObject.space.name,
      );
      expect(collectCoinsDocument.space.origin).toBe(
        collectCoinsObject.space.origin,
      );
      expect(collectCoinsDocument.timer).toBe(collectCoinsObject.timer);
    });
  });
});
