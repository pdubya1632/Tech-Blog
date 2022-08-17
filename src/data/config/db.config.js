module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DBNAME_DEV,
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
  test: {
    username: null,
    password: null,
    database: process.env.DBNAME_TEST,
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
