// middleware/auth.js
import jwt from 'jsonwebtoken';

// Middleware para validar el token
const authenticateToken = (req, res, next) => {
  // Obtener el token del encabezado Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // `Bearer TOKEN`

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user; // Almacenar los datos del usuario en el request
    next(); // Llamar a la siguiente función de middleware
  });
};

// Exportar la función
export default authenticateToken;
