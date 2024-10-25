import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";
export const tbl_equipoproyecto = sequelize.define(
  "tbl_equipoproyecto",
  {
    idEquipoProyecto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idEquipo: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    idProyecto: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
   
  }, {
    sequelize,
    tableName: 'tbl_equipoproyecto',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idEquipoProyecto" },
        ]
      },
      {
        name: "tbl_equipoproyecto_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "idEquipo" },
        ]
      },
      {
        name: "tbl_equipoproyecto_ibfk_2",
        using: "BTREE",
        fields: [
          { name: "idProyecto" },
        ]
      },
    ]
  });
 