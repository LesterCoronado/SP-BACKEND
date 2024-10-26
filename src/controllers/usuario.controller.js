import { tbl_usuario } from "../models/tbl_usuario.js";
import { tbl_empleado } from "../models/tbl_empleado.js";
import { tbl_asignarrol } from "../models/tbl_asignarrol.js";
import { transporter } from "../services/mailer.js";
import { tbl_rol } from "../models/tbl_rol.js";
import { sequelize } from "../db.js";
import bcrypt from "bcryptjs";

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await tbl_usuario.findAll({
      attributes: ["idUsuario"], // Solo queremos 'idUsuario' del modelo tbl_usuario
      include: {
        model: tbl_empleado,
        as: "empleado",
        attributes: ["nombre"], // Solo queremos 'nombre' del modelo tbl_empleado
      },
    });

    // Mapeamos el resultado para devolver el formato deseado
    const resultado = usuarios.map((usuario) => ({
      idUsuario: usuario.idUsuario,
      nombre: usuario.empleado.nombre,
    }));

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const usuarios = await tbl_asignarrol.findAll({
      include: [
        {
          model: tbl_usuario,
          as: "usuario",
          include: {
            model: tbl_empleado,
            as: "empleado",
            attributes: ["nombre", "apellido", "correo"], // Solo incluimos los atributos necesarios
          },
        },
        {
          model: tbl_rol,
          as: "idRol_tbl_rol",
          attributes: ["nombre"], // Solo incluimos el nombre del rol
        },
      ],
    });

    const resultado = usuarios.map(({ usuario, idRol_tbl_rol }) => ({
      idUsuario: usuario?.idUsuario || null,
      estado: usuario?.estado || null,
      nombre: usuario?.empleado?.nombre || null,
      apellido: usuario?.empleado?.apellido || null,
      correo: usuario?.empleado?.correo || null,
      rol: idRol_tbl_rol?.nombre || null,
    }));

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};
export const getUserById = async (req, res) => {
  const { idUsuario } = req.params; // Obtener el idUsuario de los parámetros de la URL

  try {
    // Buscar el usuario específico por idUsuario
    const usuario = await tbl_asignarrol.findOne({
      where: { idUsuario }, // Filtrar por el idUsuario
      include: [
        {
          model: tbl_usuario,
          as: "usuario",
          attributes: ["idUsuario", "estado"], // Incluir idUsuario y estado
          include: {
            model: tbl_empleado,
            as: "empleado",
            attributes: [
              "nombre",
              "apellido",
              "correo",
              "fechaNac",
              "telefono",
            ], // Incluir nombre, apellido, correo, telefono y fechaNac
          },
        },
        {
          model: tbl_rol,
          as: "idRol_tbl_rol",
          attributes: ["idRol"], // Incluir idRol
        },
      ],
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Formatear el resultado con los nuevos atributos
    const resultado = {
      idUsuario: usuario?.usuario?.idUsuario || null,
      nombre: usuario?.usuario?.empleado?.nombre || null,
      apellido: usuario?.usuario?.empleado?.apellido || null,
      telefono: usuario?.usuario?.empleado?.telefono || null,
      correo: usuario?.usuario?.empleado?.correo || null,
      fechaNac: usuario?.usuario?.empleado?.fechaNac || null,
      idRol: usuario?.idRol_tbl_rol?.idRol || null,
      estado: usuario?.usuario?.estado || null,
    };

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

export const createUser = async (req, res) => {
  const {
    nombre,
    apellido,
    correo,
    contraseña,
    telefono,
    fechaNac,
    idRol,
    estado,
  } = req.body;

  // Iniciamos una transacción
  const t = await sequelize.transaction();

  try {
    // Obtener el idEmpleado más alto y generar un nuevo id
    let maxId = await tbl_empleado.max("idEmpleado", { transaction: t });
    let newId = maxId + 1;

    // Crear el empleado con la transacción activa
    const empleado = await tbl_empleado.create(
      {
        idEmpleado: newId,
        nombre,
        apellido,
        correo,
        telefono,
        fechaNac,
      },
      { transaction: t }
    );

    // Cifrar la contraseña usando bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

    // Crear el usuario con la transacción activa
    let maxIdUser = await tbl_usuario.max("idUsuario", { transaction: t });
    let newIdUser = maxIdUser + 1;

    const usuario = await tbl_usuario.create(
      {
        idUsuario: newIdUser,
        idEmpleado: empleado.idEmpleado,
        contraseña: hashedPassword, // Guardamos la contraseña cifrada
        estado,
      },
      { transaction: t }
    );

    // Asignar el rol al usuario con la transacción activa
    let maxIdAR = await tbl_asignarrol.max("idAsignarRol", { transaction: t });
    let newIdAR = maxIdAR + 1;

    await tbl_asignarrol.create(
      {
        idAsignarRol: newIdAR,
        idUsuario: usuario.idUsuario,
        idRol,
      },
      { transaction: t }
    );

    const info = await transporter.sendMail({
      from: '"Soporte TestZen" <lcoronadoj@miumg.edu.gt>', // sender address
      to: empleado.correo, // list of receivers
      subject: "¡Bienvenido a TestZen!", // Subject line
      text: "Tu cuenta ha sido creada exitosamente en nuestro sistema. Estamos emocionados de tenerte con nosotros.", // plain text body
      html: `     
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif; /* Cambia a la fuente que prefieras */
      margin: 0;
      padding: 0;
      background-color: #f5f5f5; /* Color de fondo suave */
    }
    .container {
      max-width: 800px; /* Ancho máximo del contenedor */
      margin: 0 auto; /* Centramos el contenedor */
      padding: 10px; /* Agregamos padding alrededor */
      background-color: #ffffff; /* Fondo blanco para el contenido */
      border-radius: 8px; /* Bordes redondeados */
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Sombra para dar profundidad */
    }
    h1 {
      
      color: #333; /* Color del título */
    }
    p {
      line-height: 1.5; /* Mejorar la legibilidad */
      color: #555; /* Color del texto */
    }
    .footer {
      text-align: center; /* Centrar el pie de página */
      margin-top: 20px; /* Espacio arriba del pie de página */
    }
   
  </style>
</head>
<body>
  <div class="container">
    <h1>¡Hola, ${empleado.nombre}!</h1>
    <p>Tu cuenta ha sido creada exitosamente en nuestro sistema. Estamos emocionados de tenerte con nosotros.</p>
    <p>Tu usuario es: <strong style="text-decoration: none;">${empleado.correo}</strong></p>
    <p>Tu clave de acceso es: <strong>${contraseña}</strong></p>
    
    <a href="http://localhost:5173/login" target="_blank" style="display: inline-block; 
    margin-top: 15px; 
    background-color: blue; 
    color: white; 
    padding: 10px 20px;
    text-decoration: none; 
    border-radius: 5px;">Visita nuestro sitio</a>

    <div class="footer">
      <p>Saludos cordiales,<br>El equipo de TestZen</p>
    </div>
  </div>
</body>
</html>
`,
    });

    // Si todo va bien, confirmamos los cambios

    await t.commit();
    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    // Si algo falla, revertimos los cambios
    await t.rollback();
    console.error(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

export const editUser = async (req, res) => {
  const { idUsuario } = req.params; // Suponiendo que el ID del usuario se pasa en los parámetros de la URL
  const {
    nombre,
    apellido,
    correo,
    telefono,
    fechaNac,
    idRol,
    contraseña,
    estado,
  } = req.body;

  // Iniciamos una transacción
  const t = await sequelize.transaction();

  try {
    // 1. Buscar el usuario por idUsuario
    const usuario = await tbl_usuario.findOne(
      { where: { idUsuario } },
      { transaction: t }
    );
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // 2. Buscar el empleado asociado al usuario
    const empleado = await tbl_empleado.findOne(
      { where: { idEmpleado: usuario.idEmpleado } },
      { transaction: t }
    );
    if (!empleado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    // 3. Actualizar los datos del empleado
    empleado.nombre = nombre;
    empleado.apellido = apellido;
    empleado.correo = correo;
    empleado.telefono = telefono;
    empleado.fechaNac = fechaNac;
    await empleado.save({ transaction: t });

    // 4. Si se proporciona una nueva contraseña, cifrarla y actualizarla
    if (contraseña) {
      const saltRounds = 10;
      usuario.contraseña = await bcrypt.hash(contraseña, saltRounds);
    }

    // 5. Actualizar el estado del usuario (si se proporciona un nuevo estado)
    if (estado !== undefined) {
      // Verificamos si 'estado' fue proporcionado
      usuario.estado = estado;
    }

    // 6. Guardar cambios en la tabla tbl_usuario
    await usuario.save({ transaction: t });

    // 7. Actualizar el rol del usuario (si se proporciona un nuevo rol)
    if (idRol) {
      const asignarRol = await tbl_asignarrol.findOne(
        { where: { idUsuario } },
        { transaction: t }
      );
      if (asignarRol) {
        asignarRol.idRol = idRol;
        await asignarRol.save({ transaction: t });
      } else {
        await tbl_asignarrol.create(
          { idUsuario: usuario.idUsuario, idRol },
          { transaction: t }
        );
      }
    }

    // 8. Si todo va bien, confirmamos los cambios
    await t.commit();
    res.status(200).json({ message: "Usuario editado correctamente" });
  } catch (error) {
    // Si algo falla, revertimos los cambios
    await t.rollback();
    console.error(error);
    res.status(500).json({ message: "Error al editar el usuario" });
  }
};

export const deleteUser = async (req, res) => {
  const { idUsuario } = req.params; // Obtener el idUsuario de los parámetros de la URL

  // Iniciamos una transacción
  const t = await sequelize.transaction();

  try {
    // 1. Buscar el usuario por idUsuario
    const usuario = await tbl_usuario.findOne(
      { where: { idUsuario } },
      { transaction: t }
    );
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // 2. Buscar el empleado asociado al usuario
    const empleado = await tbl_empleado.findOne(
      { where: { idEmpleado: usuario.idEmpleado } },
      { transaction: t }
    );
    if (!empleado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    // 3. Eliminar la asignación de rol
    await tbl_asignarrol.destroy(
      { where: { idUsuario: usuario.idUsuario } },
      { transaction: t }
    );

    // 4. Eliminar el usuario
    await usuario.destroy({ transaction: t });

    // 5. Eliminar el empleado
    await empleado.destroy({ transaction: t });

    // 6. Si todo va bien, confirmamos los cambios
    await t.commit();
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    // Si algo falla, revertimos los cambios
    await t.rollback();
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};
