import dotenv from 'dotenv';

dotenv.config();

interface DialectOptions {
  ssl: {
    require: boolean;
    rejectUnauthorized: boolean;
  };
}

interface Config {
  [key: string]: {
    url: string;
    dialect: string;
    dialectOptions: DialectOptions;
  };
}

const config: Config = {
  development: {
    url: process.env.DATABASE_URL as string,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    url: process.env.DATABASE_URL as string,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

export default config;
