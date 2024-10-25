import { Router } from "express";
import {
  getEquipoProyecto,
  getEquipoProyectoById,
  createEquipoProyecto,
  deleteEquipoProyecto,
} from "../controllers/equipoProyecto.controller.js";
import authenticateToken from "../midelware/auth.js";

const router = Router();
router.get("/equipo-proyecto", authenticateToken, getEquipoProyecto);
router.get(
  "/equipo-proyecto/:idProyecto",
  authenticateToken,
  getEquipoProyectoById
);
router.post("/equipo-proyecto", authenticateToken, createEquipoProyecto);
router.delete(
  "/equipo-proyecto/:idEquipo/:idProyecto",
  authenticateToken,
  deleteEquipoProyecto
);
export default router;
