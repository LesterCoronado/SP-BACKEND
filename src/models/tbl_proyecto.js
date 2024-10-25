import { } from "sequelize"
import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";
export const tbl_proyecto = sequelize.define(
  "tbl_proyecto",
  {
    idProyecto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    tipoProyecto: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    progreso: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    tecnologiasUsadas: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    metodologia: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    prioridad: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    idCliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tbl_cliente",
        key: "idCliente",
      },
    }
  },
  {
    sequelize,
    tableName: "tbl_proyecto",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "idProyecto" }],
      },
      {
        name: "fk_clienteProyecto",
        using: "BTREE",
        fields: [{ name: "idCliente" }],
      }
      
    ],
  }
);
