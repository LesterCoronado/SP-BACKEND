import { Router } from "express";
import {
  getErrorByIdProyecto,
  getErrorByIdResponsable,
  getErrorById,
  getErrorByIdWP,
  createError,
  updateError,
  deleteError,
} from "../controllers/error.controller.js";
import authenticateToken from "../midelware/auth.js";

const router = Router();

router.get("/errores/:idProyecto", getErrorByIdProyecto);
router.get("/miserrores/:idResponsable", getErrorByIdResponsable);
router.get("/error/:idError",  getErrorById);
router.get("/error2/:idError",  getErrorByIdWP);
router.post("/errores", authenticateToken, createError);
router.put("/errores/:idError", authenticateToken, updateError);
router.delete("/error/:idError", deleteError);

export default router;
