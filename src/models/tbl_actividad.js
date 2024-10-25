import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";
export const tbl_actividad = sequelize.define(
  "tbl_actividad",
  {
    idActividad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    idDependencia: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "tbl_actividad",
        key: "idActividad",
      },
    },
    tipo: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    idProyecto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tbl_proyecto",
        key: "idProyecto",
      },
    },
    idResponsable: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "tbl_miembroequipo",
        key: "idMiembroEquipo",
      },
    },
    nombre: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    fechaInicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fechaFin: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    progreso: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tbl_actividad",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "idActividad" }],
      },
      {
        name: "tbl_actividad_ibfk_2",
        using: "BTREE",
        fields: [{ name: "idProyecto" }],
      },
      {
        name: "tbl_actividad_ibfk_3",
        using: "BTREE",
        fields: [{ name: "idResponsable" }],
      },
      {
        name: "tbl_actividad_ibfk_4",
        using: "BTREE",
        fields: [{ name: "idDependencia" }],
      },
    ],
  }
);
