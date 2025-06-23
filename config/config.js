require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,  // Increased from 30000 to 60000
      idle: 10000
    },
    dialectOptions: {
      connectTimeout: 60000,  // Added MySQL connection timeout
      // options: {
      //   requestTimeout: 60000  // Added request timeout
      // }
    }
  },
  test: {
    username: 'root',
    password: "",
    database: 'test',
    host: '127.0.0.1',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 10,         // Increased from 5 to 10
      min: 2,          // Increased from 0 to 2
      acquire: 120000, // Increased from 60000 to 120000
      idle: 20000,     // Increased from 10000 to 20000
      evict: 1000      // Run cleanup every second
    },
    dialectOptions: {
      connectTimeout: 120000,  // Increased from 60000 to 120000
      options: {
        requestTimeout: 120000  // Added request timeout
      }
    },
    retry: {
      max: 3,          // Maximum retry attempts
      match: [         // Error types to retry
        /ETIMEDOUT/,
        /EHOSTUNREACH/,
        /ECONNRESET/,
        /ECONNREFUSED/,
        /ETIMEDOUT/,
        /ESOCKETTIMEDOUT/,
        /EHOSTUNREACH/,
        /EPIPE/,
        /EAI_AGAIN/,
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /SequelizeHostNotFoundError/,
        /SequelizeHostNotReachableError/,
        /SequelizeInvalidConnectionError/,
        /SequelizeConnectionTimedOutError/,
        /SequelizeConnectionAcquireTimeoutError/
      ]
    }
  },
};
