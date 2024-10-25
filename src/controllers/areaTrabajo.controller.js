import { tbl_areatrabajo } from "../models/tbl_areatrabajo.js";
export const getAreaTrabajo = async (req, res) => {
    try {
      const areaTrabajo = await tbl_areatrabajo.findAll();
      res.send(areaTrabajo);
    } catch (error) {
      console.log("Error getAreaTrabajo", error);
      res.send(error);
    }
  };