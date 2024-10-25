import { tbl_cliente } from "../models/tbl_cliente.js";

export const getCliente = async (req, res) => {
    try {
      const clientes = await tbl_cliente.findAll();
      res.send(clientes);
    } catch (error) {
      console.log("Error getCliente", error);
      res.send(error);
    }
  };

export const getClienteById = async (req, res) => {
    const { idCliente } = req.params;
  
    try {
      const cliente = await tbl_cliente.findOne({
        where: {
          idCliente,
        },
      });
  
      if (cliente) {
        res.send(cliente);
      } else {
        res.status(404).send({
          message: "Cliente not found",
        });
      }
    } catch (error) {
      console.log("Error getClienteById", error);
      res.send(error);
    }
  }

  export const createCliente = async (req, res) => {
    const {
      idCliente,
      nombre,
      industria,
      pais,
      direccion,
      telefono,
      correo,
      estado
      
    } = req.body;
  
    try {
      let maxId = await tbl_cliente.max("idCliente");
      let newId = maxId + 1;
      const newPrueba = await tbl_cliente.create(
        {
          idCliente: newId,
          nombre,
          industria,
          pais,
          direccion,
          telefono,
          correo,
          estado
        },
        {
          fields: [
            "idCliente",
            "nombre",
            "industria",
            "pais",
            "direccion",
            "telefono",
            "correo",
            "estado"
          ],
        }
      );
  
      res.status(201).json(newPrueba);
    } catch (error) {
      console.log("Error createCliente", error);
      res.status(500).send({
        message: "Something went wrong while creating the cliente",
      });
    }
  };

  export const updateCliente = async (req, res) => {
    const { idCliente } = req.params;
    const {
      nombre,
      insdustria,
      pais,
      direccion,
      telefono,
      correo,
      estado
    } = req.body;
  
    try {
      const cliente = await tbl_cliente.findOne({
        where: {
          idCliente,
        },
      });
  
      if (cliente) {
        const updatedCliente = await cliente.update({
          nombre,
          insdustria,
          pais,
          direccion,
          telefono,
          correo,
          estado
        });
  
        res.status(200).json(updatedCliente);
      } else {
        res.status(404).send({
          message: "Cliente not found",
        });
      }
    } catch (error) {
      console.log("Error updateCliente", error);
      res.status(500).send({
        message: "Something went wrong while updating the cliente",
      });
    }
  }
  
  export const deleteCliente = async (req, res) => {
    const { idCliente } = req.params;
  
    try {
      const deleted = await tbl_cliente.destroy({
        where: { idCliente },
      });
  
      if (deleted) {
        res.json({
          message: "Cliente deleted successfully",
        });
      } else {
        res.status(404).json({
          message: "Cliente not found",
        });
      }
    } catch (error) {
      console.log("Error deleteCliente", error);
      res.status(500).send({
        message: "Something went wrong while deleting the cliente",
      });
    }
  }