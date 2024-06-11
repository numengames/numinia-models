import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';

import { GameScoreModel } from '../../src';
import { GameScoreAttributes } from '../../src/interfaces';

export default (params: Partial<GameScoreAttributes>) =>
  GameScoreModel.create({
    user: new mongoose.Types.ObjectId(),
    game: new mongoose.Types.ObjectId(),
    score: faker.number.int({ min: 1, max: 30 }),
    timer: faker.number.int({ min: 1, max: 1000 }),
    ...params,
  });
