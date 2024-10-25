import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";
export const tbl_areatrabajo = sequelize.define(
  "tbl_areatrabajo",
  {

    idAreaTrabajo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    funciones: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tbl_areatrabajo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idAreaTrabajo" },
        ]
      },
    ]
  });
