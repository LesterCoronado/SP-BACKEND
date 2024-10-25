import { Router } from "express";
import {
  getEquipo,
  createEquipo,
  getEquipoById,
  updateEquipo,
  deleteEquipo,
} from "../controllers/equipo.controller.js";
import authenticateToken from "../midelware/auth.js";

const router = Router();
router.get("/equipos", authenticateToken, getEquipo);
router.get("/equipo/:idEquipo", authenticateToken, getEquipoById);
router.post("/equipos", authenticateToken, createEquipo);
router.put("/equipos/:idEquipo", authenticateToken, updateEquipo);
router.delete("/equipos/:idEquipo", authenticateToken, deleteEquipo);
export default router;
