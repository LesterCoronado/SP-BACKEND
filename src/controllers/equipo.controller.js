import { tbl_equipo } from "../models/tbl_equipo.js";
import { tbl_areatrabajo } from "../models/tbl_areatrabajo.js";
import { tbl_miembroequipo } from "../models/tbl_miembroequipo.js";
import { tbl_usuario } from "../models/tbl_usuario.js";
import { tbl_empleado } from "../models/tbl_empleado.js";

export const getEquipo = async (req, res) => {
  try {
    // Consulta los equipos con el área de trabajo
    const equipos = await tbl_equipo.findAll({
      include: [
        {
          model: tbl_areatrabajo,
          as: "idAreaTrabajo_tbl_areatrabajo",
          attributes: ["nombre"],
        },
      ],
    });

    if (equipos.length === 0) {
      return res.status(404).json({
        message: "No equipos found for this project",
      });
    }

    // Consulta los miembros de equipo con los detalles del empleado
    const miembrosEquipo = await tbl_miembroequipo.findAll({
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

    // Mapeo de la respuesta combinando equipos con sus miembros
    const respuesta = equipos.map((equipo) => {
      const miembrosDelEquipo = miembrosEquipo.filter(
        (miembro) => miembro.idEquipo === equipo.idEquipo
      );

      return {
        equipo: {
          idEquipo: equipo.idEquipo,
          nombre: equipo.nombre,
          descripcion: equipo.descripcion,
          estado: equipo.estado,
          areaTrabajo: equipo.idAreaTrabajo_tbl_areatrabajo.nombre,
          miembros: miembrosDelEquipo.map((miembro) => {
            const id = miembro.idMiembroEquipo;
            const nombre = miembro.usuario.empleado
              ? miembro.usuario.empleado.nombre
              : "Sin nombre";
            const apellido = miembro.usuario.empleado
              ? miembro.usuario.empleado.apellido
              : "Sin apellido";
            const puesto = miembro.puesto || "Sin puesto";
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
        },
      };
    });

    res.json(respuesta); // Respuesta organizada con la nueva estructura
  } catch (error) {
    console.log("Error getProyectoById", error);
    res.status(500).send({
      message: "Something went wrong while fetching the teams",
    });
  }
};
export const createEquipo = async (req, res) => {
  const { idEquipo, nombre, descripcion, idAreaTrabajo } = req.body;

  try {
    let maxId = await tbl_equipo.max("idEquipo");
    let newIdEquipo = maxId + 1;

    const newEquipo = await tbl_equipo.create(
      {
        idEquipo: newIdEquipo,
        nombre,
        descripcion,
        idAreaTrabajo,
        estado: true,
      },
      {
        fields: [
          "idEquipo",
          "nombre",
          "descripcion",
          "idAreaTrabajo",
          "estado",
        ],
      }
    );

    res.status(201).json(newEquipo);
  } catch (error) {
    console.log("Error createEquipo", error);
    res.status(500).send({
      message: "Something went wrong while creating the equipo",
    });
  }
};

//Devuelve una equipo en especifico(con fines de edicion)
export const getEquipoById = async (req, res) => {
  const { idEquipo } = req.params;

  try {
    const equipo = await tbl_equipo.findByPk(idEquipo);
    if (equipo) {
      res.json(equipo);
    } else {
      res.status(404).json({
        message: "Equipo not found",
      });
    }
  } catch (error) {
    console.log("Error getEquipoById", error);
    res.status(500).send({
      message: "Something went wrong while fetching the error",
    });
  }
};

export const updateEquipo = async (req, res) => {
  const { idEquipo } = req.params;
  const { nombre, descripcion, idAreaTrabajo, estado } = req.body;

  try {
    const equipo = await tbl_equipo.findByPk(idEquipo);

    if (equipo) {
      await equipo.update({
        nombre,
        descripcion,
        idAreaTrabajo,
        estado
      });

      res.json({
        message: "Equipo updated successfully",
      });
    } else {
      res.status(404).json({
        message: "Equipo not found",
      });
    }
  } catch (error) {
    console.log("Error updateEquipo", error);
    res.status(500).send({
      message: "Something went wrong while updating the equipo",
    });
  }
}

export const deleteEquipo = async (req, res) => {
  const { idEquipo } = req.params;

  try {
    const equipo = await tbl_equipo.findByPk(idEquipo);

    if (equipo) {
      await equipo.destroy();
      res.json({
        message: "Equipo deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "Equipo not found",
      });
    }
  } catch (error) {
    console.log("Error deleteEquipo", error);
    res.status(500).send({
      message: "Something went wrong while deleting the equipo",
    });
  }
}
