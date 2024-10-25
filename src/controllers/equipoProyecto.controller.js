import { tbl_equipoproyecto } from "../models/tbl_equipoproyecto.js";
import { tbl_equipo } from "../models/tbl_equipo.js";
import { tbl_proyecto } from "../models/tbl_proyecto.js";
import { tbl_miembroequipo } from "../models/tbl_miembroequipo.js";
import { tbl_usuario } from "../models/tbl_usuario.js";
import { tbl_empleado } from "../models/tbl_empleado.js";
export const getEquipoProyecto = async (req, res) => {
  try {
    const equipoProyecto = await tbl_equipoproyecto.findAll({
      include: [
        {
          model: tbl_equipo,
          as: "equipo",
          attributes: ["nombre"],
        },
        {
          model: tbl_proyecto,
          as: "proyecto",
          attributes: ["nombre"],
        },
      ],
    });
    res.send(equipoProyecto);
  } catch (error) {
    console.log("Error getEquipo", error);
    res.send(error);
  }
};

export const getEquipoProyectoById = async (req, res) => {
  const { idProyecto } = req.params;

  try {
    const equipos = await tbl_equipoproyecto.findAll({
      where: { idProyecto },
      include: [
        {
          model: tbl_equipo,
          as: "equipo",
          attributes: ["idEquipo", "nombre"],
        },
      ],
    });

    if (equipos.length === 0) {
      return res.status(404).json({
        message: "No equipos found for this project",
      });
    }

    const idEquipo = equipos.map((equipo) => equipo.equipo.idEquipo);

    const miembrosEquipo = await tbl_miembroequipo.findAll({
      where: { idEquipo: idEquipo },
      include: [
        {
          model: tbl_usuario,
          as: "usuario",
          attributes: ["idEmpleado"],
          include: [
            {
              model: tbl_empleado,
              as: "empleado",
              attributes: ["nombre", "apellido", "correo"],
            },
          ],
        },
      ],
    });

    const respuesta = equipos.map((equipo) => {
      const nombreEquipo = equipo.equipo.nombre;

      const miembrosDelEquipo = miembrosEquipo.filter(
        (miembro) => miembro.idEquipo === equipo.equipo.idEquipo
      );

      return {
        equipo: nombreEquipo,
        miembros: miembrosDelEquipo.map((miembro) => {
          const id = miembro.idMiembroEquipo;
          const nombre = miembro.usuario.empleado
            ? miembro.usuario.empleado.nombre
            : "Sin nombre";
          const apellido = miembro.usuario.empleado
            ? miembro.usuario.empleado.apellido
            : "Sin apellido";
          const puesto = miembro.puesto || "Sin puesto"; // Agrega el puesto aquí
          const correo = miembro.usuario.empleado.correo
            ? miembro.usuario.empleado.correo
            : "Sin correo";
          return {
            id,
            nombre: `${nombre} ${apellido}`,
            puesto,
            correo,
          };
        }),
      };
    });

    res.json(respuesta);
  } catch (error) {
    console.log("Error getProyectoById", error);
    res.status(500).send({
      message: "Something went wrong while fetching the teams",
    });
  }
};

export const createEquipoProyecto = async (req, res) => {
  const { idEquipo, idProyecto } = req.body;
  try {
    // Verificar si el equipo ya está asignado al proyecto
    let equipoAsignado = await tbl_equipoproyecto.findOne({
      where: {
        idEquipo,
        idProyecto,
      },
    });

    if (equipoAsignado) {
      // Si ya está asignado, lanzar una alerta
      return res.status(409).json({
        message: "El equipo ya está asignado a este proyecto.",
      });
    }
    let maxId = await tbl_equipoproyecto.max("idEquipoProyecto");
    let newIdProyecto = maxId + 1;
    let newEquipoProyecto = await tbl_equipoproyecto.create(
      {
        idEquipoProyecto: newIdProyecto,
        idEquipo,
        idProyecto,
      },
      {
        fields: ["idEquipoProyecto", "idEquipo", "idProyecto"],
      }
    );
    if (newEquipoProyecto) {
      return res.json({
        message: "Asignacion created successfully",
        data: newEquipoProyecto,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong. Proyecto not created",
      data: {},
    });
  }
};

export const deleteEquipoProyecto = async (req, res) => {
  const { idEquipo, idProyecto } = req.params;
  try {
    const deleteRowCount = await tbl_equipoproyecto.destroy({
      where: {
        idEquipo,
        idProyecto,
      },
    });

    if (deleteRowCount > 0) {
      res.json({
        message: "Asignacion deleted successfully",
        count: deleteRowCount,
      });
    } else {
      res.status(404).json({
        message: "No se encontró la asignación para eliminar",
        count: deleteRowCount,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Algo salió mal. Asignación no eliminada",
      data: {},
    });
  }
};
