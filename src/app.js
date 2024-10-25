import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import proyectoRouter from "./routes/proyecto.routes.js";
import clienteRouter from "./routes/cliente.routes.js";
import equipoRouter from "./routes/equipo.routes.js";
import equipoProyectoRouter from "./routes/equipoproyecto.routes.js";
import actividadRouter from "./routes/actividad.routes.js";
import pruebaRouter from "./routes/prueba.routes.js";
import errorRouter from "./routes/error.routes.js";
import informeRouter from "./routes/informe.routes.js";
import areaTrabajoRouter from "./routes/areaTrabajo.routes.js"
import miembroEquipoRouter from "./routes/miembroEquipo.routes.js"
import usuarioRouter from "./routes/usuario.routes.js";
import loginRouter from "./routes/login.routes.js";
import rolRouter from "./routes/rol.routes.js";
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(proyectoRouter);
app.use(clienteRouter);
app.use(equipoRouter);
app.use(equipoProyectoRouter);
app.use(actividadRouter);
app.use(pruebaRouter);
app.use(errorRouter);
app.use(informeRouter);
app.use(areaTrabajoRouter);
app.use(miembroEquipoRouter)
app.use(usuarioRouter);
app.use(loginRouter);
app.use(rolRouter);

export default app;