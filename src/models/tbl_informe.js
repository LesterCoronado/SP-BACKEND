import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";
export const tbl_informe = sequelize.define(
  "tbl_informe",
  {
 
    idInforme: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fechaGenerado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idProyecto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_proyecto',
        key: 'idProyecto'
      }
    },
    erroresEncontrados: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    erroresCorregidos: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    coberturaPruebas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tiempoPromedioResolucion: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tbl_informe',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idInforme" },
        ]
      },
      {
        name: "fk_informe_1",
        using: "BTREE",
        fields: [
          { name: "idProyecto" },
        ]
      },
    ]
  });
 