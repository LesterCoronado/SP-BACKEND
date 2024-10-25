import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";
export const tbl_error = sequelize.define(
  "tbl_error",
  {
    idError: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idPrueba: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_prueba',
        key: 'idPrueba'
      }
    },
    idResponsable: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_miembroequipo',
        key: 'idMiembroEquipo'
      }
    },
    severidad: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    fechaGenerado:{
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fechaLimite:{
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    
    fechaResolucion:{
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    evidencia:{
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    tiempoResolucion:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'tbl_error',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idError" }
        ]
      },
      {
        name: "tbl_error_ibfk",
        using: "BTREE",
        fields: [
          { name: "idPrueba" },
        ]
      },
      {
        name: "tbl_error_ibfk2",
        using: "BTREE",
        fields: [
          { name: "idResponsable" },
        ]
      },
    ]
  });
 
