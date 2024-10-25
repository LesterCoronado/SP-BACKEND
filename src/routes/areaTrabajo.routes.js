import { Router } from "express";
import {
  getAreaTrabajo
} from "../controllers/areaTrabajo.controller.js";
import authenticateToken from "../midelware/auth.js";
const router = Router();

router.get("/areaTrabajo", authenticateToken, getAreaTrabajo);

export default router;
