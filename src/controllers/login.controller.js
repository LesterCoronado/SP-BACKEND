import { tbl_usuario } from "../models/tbl_usuario.js";
import { tbl_empleado } from "../models/tbl_empleado.js";
import { tbl_asignarrol } from "../models/tbl_asignarrol.js";
import { tbl_miembroequipo } from "../models/tbl_miembroequipo.js";
import bcrypt from "bcryptjs"; // Para comparar la contraseña hasheada
import jwt from "jsonwebtoken"; // Para generar tokens de sesión
import { transporter } from "../services/mailer.js";

export const login = async (req, res) => {
  const { email, password } = req.body; // El cliente envía email y password

  try {
    // 1. Buscar el empleado por correo en la tabla tbl_empleado
    const empleado = await tbl_empleado.findOne({
      where: { correo: email },
    });

    if (!empleado) {
      return res.status(404).json({ message: "not found" });
    }

    // 2. Buscar el usuario asociado al empleado
    const usuario = await tbl_usuario.findOne({
      where: { idEmpleado: empleado.idEmpleado },
    });

    if (!usuario) {
      return res.status(404).json({ message: "not found" });
    }

    // 3. Verificar si el usuario tiene el estado `true`
    if (!usuario.estado) {
      // Suponiendo que el campo `estado` es un booleano
      return res.status(403).json({ message: "El usuario está inactivo" });
    }

    // 4. Comparar la contraseña ingresada con la contraseña hasheada almacenada
    const isPasswordValid = await bcrypt.compare(password, usuario.contraseña);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "not found" });
    }
    // 5. Buscar el idRol del usuario en la tabla tbl_asignarrol
    const asignacionRol = await tbl_asignarrol.findOne({
      where: { idUsuario: usuario.idUsuario },
    });

    if (!asignacionRol) {
      return res.status(404).json({ message: "Rol no asignado al usuario" });
    }

    const idRol = asignacionRol.idRol;

    const miembroEquipo = await tbl_miembroequipo.findOne({
      where: { idUsuario: usuario.idUsuario },
    });

    // 5. Generar un token JWT (opcional, para manejo de sesiones)
    const token = jwt.sign(
      {
        idUsuario: usuario.idUsuario,
        idEmpleado: empleado.idEmpleado,
        idRol: idRol,
        idMiembroEquipo: miembroEquipo ? miembroEquipo.idMiembroEquipo : null,
      },
      process.env.JWT_SECRET, // Usando la variable de entorno para el secreto
      { expiresIn: "8h" } // Expiración del token
    );

    // 6. Responder con éxito y enviar el token
    return res.status(200).json({ message: "Login exitoso", token });
  } catch (error) {
    console.error("Error al realizar login", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body; // El cliente envía su correo electrónico

  try {
    // 1. Buscar el empleado por correo en la tabla tbl_empleado
    const empleado = await tbl_empleado.findOne({ where: { correo: email } });

    if (!empleado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    // 2. Buscar el usuario asociado al empleado
    const usuario = await tbl_usuario.findOne({
      where: { idEmpleado: empleado.idEmpleado },
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // 3. Generar un token JWT para restablecimiento de contraseña (con expiración)
    const resetToken = jwt.sign(
      { idUsuario: usuario.idUsuario, idEmpleado: empleado.idEmpleado },
      process.env.JWT_SECRET, // Secreto para JWT desde variable de entorno
      { expiresIn: "1h" } // El token expira en 1 hora
    );

    // 4. Crear el enlace de restablecimiento de contraseña
    const resetLink = `${process.env.FRONTEND_URL}/${resetToken}`; // Enlace que recibirá el frontend

    // 5. Enviar el enlace por correo electrónico
    const info = await transporter.sendMail({
      from: '"Soporte TestZen" <lcoronadoj@miumg.edu.gt>', // sender address
      to: email, // list of receivers
      subject: "Restablecer Contraseña", // Subject line
      text: "Te hemos enviado un enlace para restablecer tu contraseña", // plain text body
      html: `
      <html>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div style="padding: 20px; text-align: center; background-color: #007bff; border-radius: 8px 8px 0 0;">
            <h2 style="color: #ffffff; margin: 0;">Restablecer tu Contraseña</h2>
          </div>
          <div style="padding: 30px; color: #333333;">
            <p style="font-size: 16px;">Hola, ${empleado.nombre}</p>
            <p style="font-size: 16px; line-height: 1.5;">
              Has solicitado cambiar tu contraseña. Haz clic en el botón de abajo para restablecerla:
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="
                display: inline-block;
                background-color: #007bff;
                color: #ffffff;
                padding: 12px 24px;
                font-size: 16px;
                font-weight: bold;
                border-radius: 4px;
                text-decoration: none;
              ">Restablecer Contraseña</a>
            </div>
            <p style="font-size: 14px; color: #555555;">
              Este enlace expirará en 1 hora. Si no solicitaste este cambio, puedes ignorar este mensaje.
            </p>
          </div>
          <div style="padding: 15px; text-align: center; background-color: #f8f9fa; border-radius: 0 0 8px 8px;">
            <p style="font-size: 12px; color: #999999;">
              © 2024 TestZen. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </body>
    </html>
    
      `,
    });

    return res
      .status(200)
      .json({ message: "Correo de restablecimiento enviado" });
  } catch (error) {
    console.error("Error al solicitar restablecimiento de contraseña", error);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

export const resetPassword = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // `Bearer TOKEN`
  const { password } = req.body;
  if (!token) {
    return res.status(401).json({ mensaje: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      // Verifica si el error es por token expirado
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({
            mensaje: "El token ha expirado. Por favor, solicite uno nuevo.",
          });
      }
      return res.sendStatus(403); // Forbidden
    }
    req.user = user; // Almacenar los datos del usuario en el request
    try {
      const usuario = await tbl_usuario.findByPk(req.user.idUsuario);
      if (!usuario) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      }

      // Cifrar la contraseña usando bcrypt
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      usuario.contraseña = hashedPassword; // Utiliza una función de hash aquí
      await usuario.save();

      res.json({ mensaje: "Contraseña cambiada con éxito" });
    } catch (error) {
      console.error(error); // Agrega esto para ayudar a depurar
    }
  });
};
