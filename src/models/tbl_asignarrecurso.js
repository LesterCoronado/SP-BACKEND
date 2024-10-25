import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";
export const tbl_asignarrecurso = sequelize.define(
  "tbl_asignarrecurso",
  {
    idAsignarRecurso: {
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
    idEquipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_equipo',
        key: 'idEquipo'
      }
    }
  }, {
    sequelize,
    tableName: 'tbl_asignarrecurso',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idAsignarRecurso" },
        ]
      },
      {
        name: "tbl_recurso_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "idProyecto" },
        ]
      },
      {
        name: "tbl_recurso_ibfk_2",
        using: "BTREE",
        fields: [
          { name: "idEquipo" },
        ]
      },
    ]
  });
 