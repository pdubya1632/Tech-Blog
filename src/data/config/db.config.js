module.export = {
  development: {
    username: null,
    password: null,
    database: 'PROCESS.ENV.DBNAME_DEV',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: null,
    password: null,
    database: 'PROCESS.ENV.DBNAME_TEST',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: null,
    password: null,
    database: 'PROCESS.ENV.DBNAME_PRODUCTION',
    host: '127.0.0.1',
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
  },
};
