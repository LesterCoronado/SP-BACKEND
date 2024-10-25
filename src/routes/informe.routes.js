import { Router } from "express";
import {
  getInformeByIdProyecto,


} from "../controllers/informe.controller.js";
import authenticateToken from "../midelware/auth.js";
const router = Router();

router.get("/informe/:idProyecto", authenticateToken, getInformeByIdProyecto);


export default router;
