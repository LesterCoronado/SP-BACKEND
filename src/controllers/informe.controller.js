import { tbl_error } from "../models/tbl_error.js";
import { tbl_prueba } from "../models/tbl_prueba.js";
import { tbl_proyecto } from "../models/tbl_proyecto.js";
import { Op } from "sequelize";

export const getInformeByIdProyecto = async (req, res) => {
  const { idProyecto } = req.params;

  try {
    // Consulta para obtener los errores relacionados al proyecto
    const errores = await tbl_error.findAll({
      include: [
        {
          model: tbl_prueba,
          as: "idPrueba_tbl_prueba",
          where: { idProyecto },
          attributes: [],
        },
      ],
    });

    // Calcular el total de errores y los estados específicos
    const totalErrores = errores.length;
    const erroresCorregidos = errores.filter((error) => error.estado === "corregido");
    const totalErroresCorregidos = erroresCorregidos.length;
    const totalErroresPendientes = errores.filter((error) => error.estado === "pendiente").length;

    // Calcular el tiempo promedio de resolución de errores corregidos
    const tiempoPromedioResolucion = totalErroresCorregidos > 0
      ? erroresCorregidos.reduce((acc, error) => acc + error.tiempoResolucion, 0) / totalErroresCorregidos
      : 0;

    // Calcular la tasa de defectos corregidos
    const tasaDefectosCorregidos = totalErrores > 0
      ? ((totalErroresCorregidos / totalErrores) * 100).toFixed(2)
      : 0;

    // Calcular el total de errores por severidad
    const totalErroresSeveridadBaja = errores.filter((error) => error.severidad === "baja").length;
    const totalErroresSeveridadMedia = errores.filter((error) => error.severidad === "media").length;
    const totalErroresSeveridadAlta = errores.filter((error) => error.severidad === "alta").length;

    // Consulta para obtener las pruebas relacionadas al proyecto
    const pruebas = await tbl_prueba.findAll({
      where: { idProyecto },
    });

    // Calcular el total de pruebas y los resultados específicos
    const totalPruebas = pruebas.length;
    const totalPruebasFailed = pruebas.filter((prueba) => prueba.resultado === "failed").length;
    const totalPruebasPassed = pruebas.filter((prueba) => prueba.resultado === "passed").length;

    // Calcular la cobertura de pruebas
    const coberturaPruebas = totalPruebas > 0
      ? ((totalPruebasPassed / totalPruebas) * 100).toFixed(2)
      : 0;

    // Calcular el promedio de la duración de las pruebas
    const duracionPromedioPruebas = totalPruebas > 0
      ? pruebas.reduce((acc, prueba) => acc + prueba.duracion, 0) / totalPruebas
      : 0;

    // Organizar los datos en un objeto con arrays separados para errores y pruebas
    const informe = {
      errores: [
        {
          total: totalErrores,
          corregidos: totalErroresCorregidos,
          pendientes: totalErroresPendientes,
          tiempoPromedioResolucion: tiempoPromedioResolucion.toFixed(2),
          tasaDefectosCorregidos: `${tasaDefectosCorregidos}%`,
          severidad: {
            baja: totalErroresSeveridadBaja,
            media: totalErroresSeveridadMedia,
            alta: totalErroresSeveridadAlta,
          },
        },
      ],
      pruebas: [
        {
          total: totalPruebas,
          failed: totalPruebasFailed,
          passed: totalPruebasPassed,
          cobertura: `${coberturaPruebas}%`,
          duracionPromedio: duracionPromedioPruebas.toFixed(2),
        },
      ],
    };

      // Responder con el informe organizado
    // Si no hay errores ni pruebas, responde con un mensaje de no datos
    if (totalErrores === 0 && totalPruebas === 0) {
      return res.json({
        message: "No hay errores ni pruebas disponibles para el proyecto.",
        informe: {
          errores: [],
          pruebas: [],
        },
      });
    }

    // Si hay errores o pruebas, responde con el informe
    res.json(informe);
  } catch (error) {
    console.log("Error getInformeByIdProyecto", error);
    res.status(500).send({
      message: "Something went wrong while fetching the data",
    });
  }
};



