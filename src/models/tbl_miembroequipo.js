import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";
export const tbl_miembroequipo = sequelize.define(
  "tbl_miembroequipo",
  {
    idMiembroEquipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_usuario',
        key: 'idUsuario'
      }
    },
    idEquipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_equipo',
        key: 'idEquipo'
      }
    },
    puesto: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tbl_miembroequipo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idMiembroEquipo" },
        ]
      },
      {
        name: "fk_miembroEquipo_1",
        using: "BTREE",
        fields: [
          { name: "idEquipo" },
        ]
      },
      {
        name: "fk_miembroEquipo_2",
        using: "BTREE",
        fields: [
          { name: "idUsuario" },
        ]
      },
    ]
  });
  