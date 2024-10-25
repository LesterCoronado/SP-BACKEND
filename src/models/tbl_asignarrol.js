import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";
export const tbl_asignarrol = sequelize.define(
  "tbl_asignarrol",
  {
    idAsignarRol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idRol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_rol',
        key: 'idRol'
      }
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_usuario',
        key: 'idUsuario'
      }
    }
  }, {
    sequelize,
    tableName: 'tbl_asignarrol',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idAsignarRol" },
        ]
      },
      {
        name: "fk_rolusuario_1",
        using: "BTREE",
        fields: [
          { name: "idRol" },
        ]
      },
      {
        name: "fk_rolusuario_2",
        using: "BTREE",
        fields: [
          { name: "idUsuario" },
        ]
      },
    ]
  });
 