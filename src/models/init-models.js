import { tbl_areatrabajo } from './tbl_areatrabajo.js';
import { tbl_asignarrol } from './tbl_asignarrol.js';
import { tbl_cliente } from './tbl_cliente.js';
import { tbl_equipo } from './tbl_equipo.js';
import { tbl_error } from './tbl_error.js';
import { tbl_prueba } from './tbl_prueba.js';
import { tbl_actividad } from './tbl_actividad.js';
import { tbl_informe } from './tbl_informe.js';
import { tbl_miembroequipo } from './tbl_miembroequipo.js';
import { tbl_empleado } from './tbl_empleado.js';
import { tbl_proyecto } from './tbl_proyecto.js';
import { tbl_rol } from './tbl_rol.js';
import { tbl_usuario } from './tbl_usuario.js';
import { tbl_equipoproyecto } from './tbl_equipoproyecto.js';

// Inicialización de modelos
export function initModels(sequelize) {
  // Inicialización de modelos
  tbl_areatrabajo;
  tbl_cliente;
  tbl_equipo;
  tbl_error;
  tbl_prueba;
  tbl_actividad;
  tbl_informe;
  tbl_miembroequipo;
  tbl_empleado;
  tbl_proyecto;
  tbl_rol;
  tbl_usuario;
  tbl_equipoproyecto;
  tbl_asignarrol;

  // Definir las asociaciones

  tbl_equipo.belongsTo(tbl_areatrabajo, { as: "idAreaTrabajo_tbl_areatrabajo", foreignKey: "idAreaTrabajo" });
  tbl_areatrabajo.hasMany(tbl_equipo, { as: "tbl_equipos", foreignKey: "idAreaTrabajo" });
  
 
  
  tbl_proyecto.belongsTo(tbl_cliente, { foreignKey: "idCliente", as: "cliente" });
  tbl_cliente.hasMany(tbl_proyecto, { foreignKey: "idCliente", as: "proyectos" });
  
  
  tbl_equipoproyecto.belongsTo(tbl_equipo, { foreignKey: "idEquipo", as: "equipo" });
  tbl_equipo.hasMany(tbl_equipoproyecto, { foreignKey: "idEquipo", as: "equipoproyectos" });  

  tbl_equipoproyecto.belongsTo(tbl_proyecto, { foreignKey: "idProyecto", as: "proyecto" });
  tbl_proyecto.hasMany(tbl_equipoproyecto, { foreignKey: "idProyecto", as: "equipoproyectos" });

  
  tbl_miembroequipo.belongsTo(tbl_equipo, { as: "idEquipo_tbl_equipo", foreignKey: "idEquipo" });
  tbl_equipo.hasMany(tbl_miembroequipo, { as: "tbl_miembroequipos", foreignKey: "idEquipo" });
  

 

  tbl_actividad.belongsTo(tbl_proyecto, { as: "idProyecto_tbl_actividad", foreignKey: "idProyecto" });
  tbl_proyecto.hasMany(tbl_actividad, { as: "tbl_actividad", foreignKey: "idProyecto" });
  
  tbl_actividad.belongsTo(tbl_miembroequipo, { as: "idResponsable_tbl_actividad", foreignKey: "idResponsable" });
  tbl_miembroequipo.hasMany(tbl_actividad, { as: "tbl_actividad", foreignKey: "idResponsable" });

  tbl_actividad.belongsTo(tbl_actividad, { as: "idDependencia_tbl_actividad", foreignKey: "idDependencia" });
  tbl_actividad.hasMany(tbl_actividad, { as: "tbl_actividad", foreignKey: "idDependencia" });
  
  tbl_error.belongsTo(tbl_miembroequipo, { as: "idResponsable_tbl_miembroequipo", foreignKey: "idResponsable" });
  tbl_miembroequipo.hasMany(tbl_error, { as: "tbl_errors", foreignKey: "idResponsable" });
  
  tbl_usuario.belongsTo(tbl_empleado, { as: 'empleado', foreignKey: 'idEmpleado' });
  tbl_empleado.hasMany(tbl_usuario, { as: 'tbl_usuarios', foreignKey: 'idEmpleado' });
  
  
  
  tbl_prueba.belongsTo(tbl_proyecto, { as: "idProyecto_tbl_proyecto", foreignKey: "idProyecto" });
  tbl_proyecto.hasMany(tbl_prueba, { as: "tbl_prueba", foreignKey: "idProyecto" });
  
  tbl_informe.belongsTo(tbl_proyecto, { as: "idProyecto_tbl_proyecto", foreignKey: "idProyecto" });
  tbl_proyecto.hasMany(tbl_informe, { as: "tbl_informes", foreignKey: "idProyecto" });
  
  tbl_error.belongsTo(tbl_prueba, { as: "idPrueba_tbl_prueba", foreignKey: "idPrueba" });
  tbl_prueba.hasMany(tbl_error, { as: "tbl_prueba", foreignKey: "idPrueba" });
  
  tbl_asignarrol.belongsTo(tbl_rol, { as: "idRol_tbl_rol", foreignKey: "idRol" });
  tbl_rol.hasMany(tbl_asignarrol, { as: "tbl_asignarrols", foreignKey: "idRol" });
  
  tbl_asignarrol.belongsTo(tbl_usuario, { as: "usuario", foreignKey: "idUsuario" });
  tbl_usuario.hasMany(tbl_asignarrol, { as: "tbl_asignarrols", foreignKey: "idUsuario" });
  


  tbl_miembroequipo.belongsTo(tbl_usuario, { as: "usuario", foreignKey: "idUsuario" });
  tbl_usuario.hasMany(tbl_miembroequipo, { as: "tbl_miembroequipos", foreignKey: "idUsuario" });

  return {
    tbl_areatrabajo,
    tbl_asignarrol,
    tbl_cliente,
    tbl_equipo,
    tbl_error,
    tbl_prueba,
    tbl_actividad,
    tbl_informe,
    tbl_miembroequipo,
    tbl_empleado,
    tbl_proyecto,
    tbl_rol,
    tbl_usuario,
  };
}
