import { sequelize } from './db.js';
import { initModels } from './models/init-models.js'; // Importa la función que inicializa los modelos
import dotenv from 'dotenv';

const models = initModels(sequelize);  // Inicializa todos los modelos

import app from './app.js';
const port = process.env.PORT || 4000;
async function main() {
  try {
    await sequelize.sync({ alter: true });
    await sequelize.authenticate();
    dotenv.config();
    console.log("Connection has been established successfully.");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
    console.log("Server listening on port", 4000);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
