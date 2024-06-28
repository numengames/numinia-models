import { Mongoose } from 'mongoose';

export default (mongoose: Mongoose, uri: string, options: Record<string, unknown>) => {
  mongoose.connect(uri, options).then(() => console.log('[insurances-models] Mongoose connected'));

  mongoose.connection.once('error', async (err: Error) => {
    console.log('[insurances-models] Mongoose error: ', err);
    await mongoose.connection.close();
    throw err;
  });

  mongoose.connection.once('disconnected', () => {
    console.log('[insurances-models] Mongoose disconnected');
  });

  process.once('SIGINT', async () => {
    await mongoose.connection.close();
    console.error('[insurances-models] Mongoose disconnected');
    process.exit(0);
  });
};
