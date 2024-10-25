import { tbl_prueba } from "../models/tbl_prueba.js";
import { sequelize } from "../db.js";
//Devuelve todas las pruebas del cronograma de un proyecto especifico
export const getPruebasByIdProyecto = async (req, res) => {
  const { idProyecto } = req.params;

  try {
    const pruebas = await tbl_prueba.findAll({
      where: { idProyecto },
    });

    if (pruebas.length > 0) {
      res.json(pruebas);
    } else {
      res.status(404).json({
        message: "No pruebas found for the given project ID",
      });
    }
  } catch (error) {
    console.log("Error getPruebasById", error);
    res.status(500).send({
      message: "Something went wrong while fetching the pruebas",
    });
  }
};

export const createPrueba = async (req, res) => {
  const {
    idProyecto,
    escenario,
    caso,
    criterioAceptacion,
    resultado,
    cobertura,
    evidencia,
    log,
    fecha,
    duracion
  } = req.body;

  try {
    let maxId = await tbl_prueba.max("idPrueba");
    let newIdPrueba = maxId + 1;
    const newPrueba = await tbl_prueba.create({
      idPrueba: newIdPrueba,
      idProyecto,
      escenario,
      caso,
      criterioAceptacion,
      resultado,
      cobertura,
      evidencia,
      log,
      fecha,
      duracion
    },
    {
      fields: [
        "idPrueba",
        "idProyecto",
        "escenario",
        "caso",
        "criterioAceptacion",
        "resultado",
        "cobertura",
        "evidencia",
        "log",
        "fecha",
        "duracion"
      ],
    });

    res.status(201).json(newPrueba);
  } catch (error) {
    console.log("Error createPrueba", error);
    res.status(500).send({
      message: "Something went wrong while creating the prueba",
    });
  }
};

//Devuelve una prueba en especifico(con fines de edicion)
export const getPruebaById = async (req, res) => {
  const { idPrueba } = req.params;

  try {
    const prueba = await tbl_prueba.findByPk(idPrueba);
    if (prueba) {
      res.json(prueba);
    } else {
      res.status(404).json({
        message: "Prueba not found",
      });
    }
  } catch (error) {
    console.log("Error getPruebaById", error);
    res.status(500).send({
      message: "Something went wrong while fetching the prueba",
    });
  }
};

//controlador para actualizar una prueba
export const updatePrueba = async (req, res) => {
  const { idPrueba } = req.params;
  const {
    escenario,
    caso,
    criterioAceptacion,
    resultado,
    cobertura,
    evidencia,
    log,
    fecha,
    duracion
  } = req.body;

  try {
    const prueba = await tbl_prueba.findByPk(idPrueba);
    if (prueba) {
      await prueba.update({
        escenario,
        caso,
        criterioAceptacion,
        resultado,
        cobertura,
        evidencia,
        log,
        fecha,
        duracion
      });
      res.json(prueba);
    } else {
      res.status(404).json({
        message: "Prueba not found",
      });
    }
  } catch (error) {
    console.log("Error updatePrueba", error);
    res.status(500).send({
      message: "Something went wrong while updating the prueba",
    });
  }
}

//controlador para eliminar una prueba
export const deletePrueba = async (req, res) => {
  const { idPrueba } = req.params;

  try {
    const prueba = await tbl_prueba.findByPk(idPrueba);
    if (prueba) {
      await prueba.destroy();
      res.json({
        message: "Prueba deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "Prueba not found",
      });
    }
  } catch (error) {
    console.log("Error deletePrueba", error);
    res.status(500).send({
      message: "Something went wrong while deleting the prueba",
    });
  }
}
