import { Router } from "express";
import {
  createActividad,
  getActividadByIdProyecto,
  getActividadByIdResponsable,
  getActividadById,
  updateActividad,
  deleteActividad
} from "../controllers/actividad.controller.js";
import authenticateToken from "../midelware/auth.js";

const router = Router();
router.post("/actividades",authenticateToken, createActividad);
router.get("/actividades/:idProyecto", getActividadByIdProyecto);
router.get("/misactividades/:idResponsable", getActividadByIdResponsable);
router.get("/actividad/:idActividad",authenticateToken, getActividadById);
router.put("/actividad/:idActividad",authenticateToken, updateActividad);
router.delete("/actividad/:idActividad",authenticateToken, deleteActividad);
export default router;
