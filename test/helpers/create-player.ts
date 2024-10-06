import { faker } from '@faker-js/faker';
import { PlayerModel } from '../../src';
import { PlayerAttributes } from '../../src/interfaces';

export default (params: Partial<PlayerAttributes> = {}) => {
  const query: Partial<PlayerAttributes> = {
    lastConnectionDate: new Date(),
    oncyberId: faker.string.uuid(),
    hyperfyId: faker.string.uuid(),
    playerName: faker.internet.userName(),
    isActive: faker.helpers.arrayElement([true, false]),
    isBlocked: faker.helpers.arrayElement([true, false]),
  };

  return PlayerModel.create({
    ...query,
    ...params,
  });
};
