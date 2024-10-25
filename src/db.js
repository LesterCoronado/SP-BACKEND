
import Sequelize  from "sequelize";
export const sequelize = new Sequelize("seminariodb", "root", "123", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});
