import { tbl_rol } from "../models/tbl_rol.js";

export const getRoles = async (req, res) => {
    try {
        const roles = await tbl_rol.findAll({
            attributes: ['idRol', 'nombre']
        });
        res.json(roles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los roles" });
    }
    }