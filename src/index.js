import { sequelize } from './db.js';
import { initModels } from './models/init-models.js'; // Importa la función que inicializa los modelos
import {
  PORT
} from "./config.js";
import dotenv from 'dotenv';

const models = initModels(sequelize);  // Inicializa todos los modelos

import app from './app.js';

async function main() {
  try {
    await sequelize.sync({ alter: true });
    await sequelize.authenticate();
    dotenv.config();
    console.log("Connection has been established successfully.");
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`)
    })
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
