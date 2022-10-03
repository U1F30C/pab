import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize';
dotenv.config();
import { appConfig } from '../src/utils/startup-config-service';

export const dbConfig = {
  dialect: <Dialect>appConfig.get('DB_CONNECTION', 'postgresql'),
  port: +appConfig.get('DB_PORT', '5432'),
  username: appConfig.get('DB_USER'),
  password: appConfig.get('DB_PASSWORD'),
  database: appConfig.get('DB_DATABASE'),
  host: appConfig.get('DB_HOST'),
  logging: console.log,
};
