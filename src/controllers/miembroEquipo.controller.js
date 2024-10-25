import { tbl_miembroequipo } from "../models/tbl_miembroequipo.js";

export const assingMiembroEquipo = async (req, res) => {
    try {
        const { idEquipo, idUsuario, puesto } = req.body;

        // Verificar si el usuario ya está asignado al equipo
        const existeMiembro = await tbl_miembroequipo.findOne({
            where: {
                idEquipo,
                idUsuario
            }
        });

        // Si ya existe, devolver un mensaje de alerta
        if (existeMiembro) {
            return res.status(409).json({
                message: "El usuario ya está asignado a este equipo."
            });
        }

        // Obtener el máximo ID actual para generar el nuevo ID
        let maxId = await tbl_miembroequipo.max("idMiembroEquipo");
        let newId = maxId + 1;

        // Crear el nuevo registro
        const miembroEquipo = await tbl_miembroequipo.create({
            idMiembroEquipo: newId,
            idEquipo,
            idUsuario,
            puesto
        });

        res.json(miembroEquipo);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Ocurrió un error al asignar el miembro al equipo."
        });
    }
};

export const unassingMiembroEquipo = async (req, res) => {
    try {
        const { idEquipo, idUsuario } = req.params;
        const miembroEquipo = await tbl_miembroequipo.destroy({
            where: {
                idEquipo,
                idUsuario
            }
        });

        if (!miembroEquipo) {
            return res.status(409).json({
                message: "No se encontró la relación de usuario con el equipo."
            });
        }

        res.json({
            message: "Usuario desasignado del equipo exitosamente."
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Ocurrió un error al desasignar el miembro del equipo."
        });
    }
};
