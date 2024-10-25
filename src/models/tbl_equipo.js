import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";
export const tbl_equipo = sequelize.define(
  "tbl_equipo",
  {
    idEquipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    idAreaTrabajo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_areatrabajo',
        key: 'idAreaTrabajo'
      }
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tbl_equipo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idEquipo" },
        ]
      },
      {
        name: "tbl_equipo_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "idAreaTrabajo" },
        ]
      },
    ]
  });
 