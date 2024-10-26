import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";
import { tbl_empleado } from "./tbl_empleado.js";
export const tbl_usuario = sequelize.define(
  "tbl_usuario",
  {
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    idEmpleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tbl_empleado',
        key: 'idEmpleado'
      }
    },
    'contraseña': {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tbl_usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUsuario" },
         
        ]
      },
      {
        name: "tbl_usuario_ibfk_2",
        using: "BTREE",
        fields: [
          { name: "idEmpleado" },
        ]
      },
    ]
  });
 