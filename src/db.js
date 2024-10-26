import Sequelize from "sequelize";
import {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  DB_PORT,
  DB_DIALECT,
} from "./config.js";
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  dialectOptions: {
    connectTimeout: 10000, // Ajusta este valor según sea necesario
  },
  logging: false, 
});