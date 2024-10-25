import { tbl_proyecto } from "../models/tbl_proyecto.js";
import { tbl_cliente } from "../models/tbl_cliente.js";
export const getProyecto = async (req, res) => {
  try {
    const proyectos = await tbl_proyecto.findAll({
      include: [
        {
          model: tbl_cliente,
          as: "cliente", // Asegúrate de usar el alias correcto aquí
          attributes: ["nombre"], // Solo traer el campo 'nombre' del cliente
        },
      ],
    });

    res.send(proyectos);
  } catch (error) {
    console.log("Error getPtoyectos", error);
    res.send(error);
  }
};
export const getProyectoById = async (req, res) => {
  const { idProyecto } = req.params;

  try {
    const proyecto = await tbl_proyecto.findByPk(idProyecto);
    if (proyecto) {
      res.json(proyecto);
    } else {
      res.status(404).json({
        message: "Proyecto not found",
      });
    }
  } catch (error) {
    console.log("Error getProyectoById", error);
    res.status(500).send({
      message: "Something went wrong while fetching the project",
    });
  }
};
export const createProyecto = async (req, res) => {
  const {
    Nombre,
    idCliente,
    tipoProyecto,
    tecnologiasUsadas,
    metodologia,
    prioridad,
    descripcion,
    estado,
    progreso,
  } = req.body;
  try {
    let maxId = await tbl_proyecto.max("idProyecto");
    let newIdProyecto = maxId + 1;
    let newProyecto = await tbl_proyecto.create(
      {
        idProyecto: newIdProyecto,
        Nombre,
        descripcion,
        estado,
        progreso,
        tipoProyecto,
        tecnologiasUsadas,
        metodologia,
        prioridad,
        idCliente,
      },
      {
        fields: [
          "idProyecto",
          "Nombre",
          "descripcion",
          "estado",
          "progreso",
          "tipoProyecto",
          "tecnologiasUsadas",
          "metodologia",
          "prioridad",
          "idCliente",
        ],
      }
    );
    if (newProyecto) {
      return res.json({
        message: "Proyecto created successfully",
        data: newProyecto,
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
export const updateProyecto = async (req, res) => {
  const { idProyecto } = req.params;
  const {
    Nombre,
    idCliente,
    tipoProyecto,
    tecnologiasUsadas,
    metodologia,
    prioridad,
    descripcion,
    estado,
    progreso,
  } = req.body;
  try {
    const proyectos = await tbl_proyecto.findByPk(idProyecto);
    await proyectos.update({
      Nombre,
      descripcion,
      estado,
      progreso,
      tipoProyecto,
      tecnologiasUsadas,
      metodologia,
      prioridad,
      idCliente,
    });
    return res.json({
      message: "Proyecto updated successfully",
      data: proyectos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong. Proyecto not updated",
      data: {},
    });
  }
};
export const deleteProyecto = async (req, res) => {
  const { idProyecto } = req.params;
  try {
    const deleteRowCount = await tbl_proyecto.destroy({
      where: {
        idProyecto,
      },
    });
    res.json({
      message: "Proyecto deleted successfully",
      count: deleteRowCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong. Proyecto not deleted",
      data: {},
    });
  }
};
