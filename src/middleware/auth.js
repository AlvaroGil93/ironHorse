import { verifyToken } from "../lib/jwt.js";


// auth.js// middleware/auth.js
export default function authMiddleware(role) {
    return async (req, res, next) => {
      const token = req.headers.authorization?.split(' ')[1]; // Obtener el token
  
      if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
      }
  
      try {
        // Verifica el token y su rol
        const decoded = await verifyToken(token); // Supongo que tienes una función de verificación
        if (decoded.role !== role) {
          return res.status(403).json({ message: 'No tienes permisos para acceder a este recurso' });
        }
        req.user = decoded; // Pasa el usuario decodificado al siguiente middleware
        next();
      } catch (error) {
        return res.status(401).json({ message: 'Token no válido: ' + error.message });
      }
    };
  }
  