import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";
import { tbl_usuario } from "./tbl_usuario.js";
export const tbl_empleado = sequelize.define(
  "tbl_empleado",
  {
  
    idEmpleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    fechaNac: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    telefono: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tbl_empleado',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idEmpleado" },
        ]
      },
    ]
  });
