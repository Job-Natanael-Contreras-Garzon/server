import { Sequelize, Options } from 'sequelize';
import config from '../config/config';

interface DialectOptions {
  ssl: {
    require: boolean;
    rejectUnauthorized: boolean;
  };
}

interface Config {
  url: string;
  dialect: string;
  dialectOptions: DialectOptions;
}

const env = (process.env.NODE_ENV as 'development' | 'production') || 'development';
const sequelizeConfig: Config = config[env];

const sequelize = new Sequelize(sequelizeConfig.url, {
  dialect: sequelizeConfig.dialect,
  dialectOptions: sequelizeConfig.dialectOptions,
} as Options);

export default sequelize;
