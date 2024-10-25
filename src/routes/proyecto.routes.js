import { Router } from "express";
import {
  getProyecto,
  createProyecto,
  updateProyecto,
  deleteProyecto,
  getProyectoById
} from "../controllers/proyecto.controller.js";
const router = Router();
router.get("/proyectos", getProyecto);
router.get("/proyectos/:idProyecto", getProyectoById);
router.post("/proyectos", createProyecto);
router.put("/proyectos/:idProyecto", updateProyecto);
router.delete("/proyectos/:idProyecto", deleteProyecto);
export default router;
