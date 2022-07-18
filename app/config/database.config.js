require('dotenv').config();

const {
  DEV_DATABASE_HOST,
  DEV_DATABASE_USERNAME,
  DEV_DATABASE_PASSWORD,
} = process.env;

module.exports = {
  development: {
    username: DEV_DATABASE_USERNAME,
    password: DEV_DATABASE_PASSWORD,
    database: 'techblog_db_dev',
    host: DEV_DATABASE_HOST,
    dialect: 'postgres',
  },
  test: {
    username: null,
    password: null,
    database: 'techblog_db_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: null,
    password: null,
    database: 'techblog_db_prod',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
