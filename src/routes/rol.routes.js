import { Router } from "express";
import {
 getRoles
} from "../controllers/rol.controller.js";
const router = Router();
import authenticateToken from "../midelware/auth.js";

router.get("/roles", authenticateToken, getRoles);




export default router;
