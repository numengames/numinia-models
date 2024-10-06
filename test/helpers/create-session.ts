import mongoose from 'mongoose';

import { SessionModel } from '../../src';
import { SessionAttributes } from '../../src/interfaces';

export default (params: Partial<SessionAttributes> = {}) => {
  const query: Partial<SessionAttributes> = {
    endAt: new Date(),
    startAt: new Date(),
    playerId: new mongoose.Types.ObjectId(),
  };

  return SessionModel.create({
    ...query,
    ...params,
  });
};
