import { Router } from "express";
import {
  getUsuarios,
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
} from "../controllers/usuario.controller.js";
import authenticateToken from "../midelware/auth.js";

const router = Router();

router.get("/usuarios", authenticateToken, getUsuarios);
router.get("/allusers", authenticateToken, getAllUsers);
router.get("/user/:idUsuario", authenticateToken, getUserById);
router.post("/createuser", authenticateToken, createUser);
router.put("/edituser/:idUsuario", authenticateToken, editUser);
router.delete("/deleteuser/:idUsuario", authenticateToken, deleteUser);

export default router;
