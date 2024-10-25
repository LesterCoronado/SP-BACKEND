import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";
import { tbl_proyecto } from "./tbl_proyecto.js";
export const tbl_cliente = sequelize.define(
  "tbl_cliente",
  {
    idCliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    industria: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    pais: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    telefono: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    correo: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tbl_cliente",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "idCliente" }],
      },
    ],
  }
);
// tbl_cliente.hasMany(tbl_proyecto, { foreignKey: "idCliente", as: "proyectos" });
// tbl_proyecto.belongsTo(tbl_cliente, { foreignKey: "idCliente", as: "cliente" });
