import { Router } from "express";
import authenticateToken from "../midelware/auth.js";
import {
  getCliente,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
} from "../controllers/cliente.controller.js";
const router = Router();
router.get("/clientes", authenticateToken, getCliente);
router.get("/cliente/:idCliente",authenticateToken, getClienteById);
router.post("/clientes", authenticateToken, createCliente);
router.put("/clientes/:idCliente",authenticateToken, updateCliente);
router.delete("/clientes/:idCliente",authenticateToken, deleteCliente);

export default router;
