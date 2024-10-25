import { Router } from "express";
import {
  assingMiembroEquipo,
  unassingMiembroEquipo,
} from "../controllers/miembroEquipo.controller.js";
import authenticateToken from "../midelware/auth.js";

const router = Router();
router.post("/miembroequipo", authenticateToken, assingMiembroEquipo);
router.delete(
  "/miembroequipo/:idEquipo/:idUsuario",
  authenticateToken,
  unassingMiembroEquipo
);

export default router;
