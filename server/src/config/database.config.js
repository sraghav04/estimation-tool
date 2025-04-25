/* Loading the environment variables from the .env file. */
const env = require('dotenv');

// Three environments
// Development
// Test
// Production

env.config();

/* Exporting the configuration for the database. */
module.exports = {
  /* Setting up the development database. */
  development: {
    ...(process.env.DISABLE_SSL
      ? {}
      : {
          connectionString: `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:5432/${process.env.DB_DATABASE}?&ssl=true`,
        }),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    schema: 'user_interface',
    searchPath: 'user_interface',
    dialectOptions: {
      prependSearchPath: true,
      ...(process.env.DISABLE_SSL
        ? {}
        : {
            ssl: {
              rejectUnauthorized: false,
            },
          }),
    },
  },
  /* Setting up the test database. */
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
  },
  /* Setting up the production database. */
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
  },
};
