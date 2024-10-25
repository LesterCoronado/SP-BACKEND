import { tbl_error } from "../models/tbl_error.js";
import { tbl_prueba } from "../models/tbl_prueba.js";
import {tbl_proyecto} from "../models/tbl_proyecto.js";
import { sequelize } from "../db.js";
import moment from "moment";

// Devuelve todos los errores del cronograma de un proyecto específico
export const getErrorByIdProyecto = async (req, res) => {
  const { idProyecto } = req.params;

  try {
    const errores = await tbl_error.findAll({
      include: [
        {
          model: tbl_prueba,
          as: "idPrueba_tbl_prueba", // Usa el alias definido en la relación con tbl_prueba
          where: { idProyecto }, // Filtra por idProyecto en tbl_prueba
          attributes: [], // No incluye los atributos de tbl_prueba en el resultado
        },
      ],
    });

    if (errores.length > 0) {
      res.json(errores);
    } else {
      res.status(404).json({
        message: "No errores found for the given project ID",
      });
    }
  } catch (error) {
    console.log("Error getErrorByIdProyecto", error);
    res.status(500).send({
      message: "Something went wrong while fetching the errores",
    });
  }
};
export const getErrorByIdResponsable = async (req, res) => {
  const { idResponsable } = req.params;

  try {
    const errores = await tbl_error.findAll({
      where: { idResponsable },
      include: [
        {
          model: tbl_prueba,
          as: "idPrueba_tbl_prueba", 
          include: [
            {
              model: tbl_proyecto,
              as: "idProyecto_tbl_proyecto",
            },
          ],

        },
      ]
    });
    const response = errores.map((error) => {
      return {
        idError: error.idError,
        idPrueba: error.idPrueba,
        idResponsable: error.idResponsable,
        severidad: error.severidad,
        fechaGenerado: error.fechaGenerado,
        fechaLimite: error.fechaLimite,
        fechaResolucion: error.fechaResolucion,
        estado: error.estado,
        evidencia: error.evidencia,
        tiempoResolucion: error.tiempoResolucion,
        descripcion: error.descripcion,
        idProyecto: error.idPrueba_tbl_prueba.idProyecto_tbl_proyecto.idProyecto,
        nombreProyecto: error.idPrueba_tbl_prueba.idProyecto_tbl_proyecto.nombreProyecto,
      };
    });

    if (errores.length > 0) {
      res.json(response);
    } else {
      res.status(404).json({
        message: "No errores found for the given responsable ID",
      });
    }
  } catch (error) {
    console.log("Error getErrorByIdResponsable", error);
    res.status(500).send({
      message: "Something went wrong while fetching the errores",
    });
  }
}
export const createError = async (req, res) => {
  const {
    idPrueba,
    idResponsable,
    severidad,
    fechaGenerado,
    fechaLimite,
    fechaResolucion,
    estado,
    evidencia,
    descripcion,
  } = req.body;

  try {
    let maxId = await tbl_error.max("idError");
    let newIdError = maxId + 1;

    // Convierte las fechas a objetos Moment para calcular la diferencia en días
    const fechaGeneradoMoment = moment(fechaGenerado);
    const fechaResolucionMoment = moment(fechaResolucion);
    const tiempoResolucion = fechaResolucionMoment.diff(
      fechaGeneradoMoment,
      "days"
    );

    // Crea el registro con el tiempoResolucion calculado
    const newPrueba = await tbl_error.create(
      {
        idError: newIdError,
        idPrueba,
        idResponsable,
        severidad,
        fechaGenerado,
        fechaLimite,
        fechaResolucion,
        estado,
        evidencia,
        tiempoResolucion: tiempoResolucion,
        descripcion,
      },
      {
        fields: [
          "idError",
          "idPrueba",
          "idResponsable",
          "severidad",
          "fechaGenerado",
          "fechaLimite",
          "fechaResolucion",
          "estado",
          "evidencia",
          "tiempoResolucion",
          "descripcion",
        ],
      }
    );

    res.status(201).json(newPrueba);
  } catch (error) {
    console.log("Error createError", error);
    res.status(500).send({
      message: "Something went wrong while creating the error",
    });
  }
};

//Devuelve una error en especifico(con fines de edicion)
export const getErrorById = async (req, res) => {
  const { idError } = req.params;

  try {
    const error = await tbl_error.findByPk(idError);
    if (error) {
      res.json(error);
    } else {
      res.status(404).json({
        message: "Error not found",
      });
    }
  } catch (error) {
    console.log("Error getErrorById", error);
    res.status(500).send({
      message: "Something went wrong while fetching the error",
    });
  }
};

// obtiene un error con información del proyecto
export const getErrorByIdWP = async (req, res) => {
  const { idError } = req.params;

  try {
    // Busca el error por idError y hace un join con tbl_prueba y tbl_proyecto
    const error = await tbl_error.findOne({
      where: { idError }, // Busca el error por idError
      include: [
        {
          model: tbl_prueba,
          as: "idPrueba_tbl_prueba",
          include: [
            {
              model: tbl_proyecto,
              as: "idProyecto_tbl_proyecto",
            },
          ],
        },
      ],
    });

    if (error) {
      const response = {
        idError: error.idError,
        idPrueba: error.idPrueba,
        idResponsable: error.idResponsable,
        severidad: error.severidad,
        fechaGenerado: error.fechaGenerado,
        fechaLimite: error.fechaLimite,
        fechaResolucion: error.fechaResolucion,
        estado: error.estado,
        evidencia: error.evidencia,
        tiempoResolucion: error.tiempoResolucion,
        descripcion: error.descripcion,
        idProyecto: error.idPrueba_tbl_prueba.idProyecto_tbl_proyecto.idProyecto,
        nombreProyecto: error.idPrueba_tbl_prueba.idProyecto_tbl_proyecto.Nombre,
      };

      res.json(response); // Devuelve el error y las relaciones procesadas
    } else {
      res.status(404).json({
        message: "Error not found",
      });
    }
  } catch (error) {
    console.log("Error getErrorById", error);
    res.status(500).send({
      message: "Something went wrong while fetching the error",
    });
  }
};



export const updateError = async (req, res) => {
  const { idError } = req.params;

  const {
    idPrueba,
    idResponsable,
    severidad,
    fechaGenerado,
    fechaLimite,
    fechaResolucion,
    estado,
    evidencia,
    descripcion,
  } = req.body;

  // Convierte las fechas a objetos Moment para calcular la diferencia en días
  const fechaGeneradoMoment = moment(fechaGenerado);
  const fechaResolucionMoment = moment(fechaResolucion);
  const tiempoResolucion = fechaResolucionMoment.diff(
    fechaGeneradoMoment,
    "days"
  );

  try {
    const [updated] = await tbl_error.update(
      {
        idPrueba,
        idResponsable,
        severidad,
        fechaGenerado,
        fechaLimite,
        fechaResolucion,
        estado,
        evidencia,
        descripcion,
        tiempoResolucion: tiempoResolucion,
      },
      {
        where: { idError },
      }
    );

    
      res.json({
        message: "Error updated successfully",
      });
     
  } catch (error) {
    console.log("Error updateError", error);
    res.status(500).send({
      message: "Something went wrong while updating the error",
    });
  }
};

export const deleteError = async (req, res) => {
  const { idError } = req.params;

  try {
    const deleted = await tbl_error.destroy({
      where: { idError },
    });

    if (deleted) {
      res.json({
        message: "Error deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "Error not found",
      });
    }
  } catch (error) {
    console.log("Error deleteError", error);
    res.status(500).send({
      message: "Something went wrong while deleting the error",
    });
  }
}