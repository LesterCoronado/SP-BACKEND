import { tbl_actividad } from "../models/tbl_actividad.js";
import { tbl_proyecto } from "../models/tbl_proyecto.js";
import { sequelize } from '../db.js';
//Devuelve todas las actividades del cronograma de un proyecto especifico
export const getActividadByIdProyecto = async (req, res) => {
  const { idProyecto } = req.params;

  try {
    const actividades = await tbl_actividad.findAll({
      where: { idProyecto },
    });

    if (actividades.length > 0) {
      res.json(actividades);
    } else {
      res.status(404).json({
        message: "No actividades found for the given project ID",
      });
    }
  } catch (error) {
    console.log("Error getActividadById", error);
    res.status(500).send({
      message: "Something went wrong while fetching the activities",
    });
  }
};

export const getActividadByIdResponsable = async (req, res) => {
  const { idResponsable } = req.params;

  try {
    const actividades = await tbl_actividad.findAll({
      where: { idResponsable},
      include: [
        {
          model: tbl_proyecto, // Relación con la tabla de proyectos
          as: "idProyecto_tbl_actividad", // Alias para la relación
          attributes: ['Nombre'], // Solo traer el nombre del proyecto
        },
      ],
    });
    const response = actividades.map((actividad) => {
      return {
        idActividad: actividad.idActividad,
        idProyecto: actividad.idProyecto,
        nombreProyecto: actividad.idProyecto_tbl_actividad.Nombre,
        idDependencia: actividad.idDependencia,
        tipo: actividad.tipo,
        idResponsable: actividad.idResponsable,
        nombre: actividad.nombre,
        fechaInicio: actividad.fechaInicio,
        fechaFin: actividad.fechaFin,
        progreso: actividad.progreso,
      };
    }
    );

    if (actividades.length > 0) {
      res.json(response);
    } else {
      res.status(404).json({
        message: "No activities found for the given responsible ID",
      });
    }
  } catch (error) {
    console.log("Error getActividadByIdResponsable", error);
    res.status(500).send({
      message: "Something went wrong while fetching the activities",
    });
  }
};

//Devuelve una actividad en especifico(con fines de edicion)
export const getActividadById = async (req, res) => {
  const { idActividad } = req.params;

  try {
    const actividad = await tbl_actividad.findByPk(idActividad);
    if (actividad) {
      res.json(actividad);
    } else {
      res.status(404).json({
        message: "Actividad not found",
      });
    }
  } catch (error) {
    console.log("Error getActividadById", error);
    res.status(500).send({
      message: "Something went wrong while fetching the activities",
    });
  }
};

export const createActividad = async (req, res) => {
  const {
    idProyecto,
    idDependencia,
    tipo,
    idResponsable,
    nombre,
    fechaInicio,
    fechaFin,
    progreso,
  } = req.body;
  try {
    let maxId = await tbl_actividad.max("idActividad");
    let newId = maxId + 1;
    let newActividad = await tbl_actividad.create(
      {
        idActividad: newId,
        idProyecto,
        idDependencia,
        tipo,
        idResponsable,
        nombre,
        fechaInicio,
        fechaFin,
        progreso,
      },
      {
        fields: [
          "idActividad",
          "idProyecto",
          "idDependencia",
          "tipo",
          "idResponsable",
          "nombre",
          "fechaInicio",
          "fechaFin",
          "progreso",
        ],
      }
    );
    if (newActividad) {
      return res.json({
        message: "Actividad created successfully",
        data: newActividad,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong. actividad not created",
      data: {},
    });
  }
};
export const updateActividad = async (req, res) => {
  const { idActividad } = req.params;
  const {
    idProyecto,
    idDependencia,
    tipo,
    idResponsable,
    nombre,
    fechaInicio,
    fechaFin,
    progreso,
  } = req.body;
  try {
    const actividad = await tbl_actividad.findByPk(idActividad);
    await actividad.update({
      idProyecto,
      idDependencia,
      tipo,
      idResponsable,
      nombre,
      fechaInicio,
      fechaFin,
      progreso,
    });
    return res.json({
      message: "Actividad updated successfully",
      data: actividad,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong. Actividad not updated",
      data: {},
    });
  }
};
export const deleteActividad = async (req, res) => {
  const { idActividad } = req.params;

  // Iniciar una transacción
  const t = await sequelize.transaction();

  try {
    // Paso 1: Actualizar las dependencias
    await tbl_actividad.update(
      { idDependencia: null },
      { where: { idDependencia: idActividad }, transaction: t } // Pasar la transacción
    );

    // Paso 2: Eliminar la actividad
    const deleteRowCount = await tbl_actividad.destroy({
      where: { idActividad },
      transaction: t, // Pasar la transacción
    });

    // Si todo sale bien, hacer commit
    await t.commit();

    res.json({
      message: "Actividad deleted successfully",
      count: deleteRowCount,
    });
  } catch (error) {
    // Si ocurre un error, hacer rollback
    await t.rollback();

    console.log(error);
    res.status(500).json({
      message: "Something went wrong. Actividad not deleted",
      data: {},
    });
  }
};
