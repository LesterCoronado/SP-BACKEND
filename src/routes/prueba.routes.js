import { Router } from "express";
import {
  getPruebasByIdProyecto,
  createPrueba,
  getPruebaById,
  updatePrueba,
  deletePrueba,
} from "../controllers/prueba.controller.js";
import authenticateToken from "../midelware/auth.js";
const router = Router();

router.get("/pruebas/:idProyecto", authenticateToken, getPruebasByIdProyecto);
router.post("/pruebas", authenticateToken, createPrueba);
router.get("/prueba/:idPrueba", authenticateToken, getPruebaById);
router.put("/pruebas/:idPrueba", authenticateToken, updatePrueba);
router.delete("/pruebas/:idPrueba", authenticateToken, deletePrueba);
export default router;
