import _ from 'lodash';
import mongoose from 'mongoose';

import constants from './constants';
import mongooseConnect from './mongoose-connect';

export * from './models';
export * as types from './types';
export * as interfaces from './interfaces';

export async function connect(uri: string, options: Record<string, unknown>): Promise<void> {
  if (_.isNil(mongoose)) {
    throw new Error('Specify `mongoose` as the first argument');
  }
  if (_.isNil(uri) || !uri) {
    throw new Error('Missing an `uri` string to establish mongodb connection');
  }
  if (!_.isNil(options) && !_.isPlainObject(options)) {
    throw new Error('The `options` argument must be an object');
  }

  await mongooseConnect(mongoose, uri, options);
}

export { mongoose, constants };
