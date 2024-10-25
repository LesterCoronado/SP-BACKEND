import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";
export const tbl_prueba = sequelize.define(
  "tbl_prueba",
  {
    idPrueba: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idProyecto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_proyecto',
        key: 'idProyecto'
      }
    },
    escenario: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    caso: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    criterioAceptacion: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    fecha:{
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    duracion:{
      type: DataTypes.STRING(20),
      allowNull: false
    },
    
    resultado: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    cobertura:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    evidencia:{
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    log:{
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    
  }, {
    sequelize,
    tableName: 'tbl_prueba',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idPrueba" },
        ]
      },
      {
        name: "tbl_Prueba_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "idProyecto" },
        ]
      },
    ]
  });
  
