module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      skipMD5: true,
      version: '6.0.6', // Version of MongoDB
    },
    autoStart: false,
    instance: {},
  },
  useSharedDBForAllJestWorkers: false,
};
