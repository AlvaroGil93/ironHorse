import express from 'express';
// loginRoutes.js
import authMiddleware  from '../middleware/auth.js';  
import { loginService } from '../services/loginService.js';


const loginRouter = express.Router();

// Ruta para iniciar sesión
loginRouter.post('/', loginService);

// Ruta protegida de ejemplo
// router.get('/protected', authMiddleware, (req, res) => {
//     res.status(200).json({ message: 'Acceso autorizado', user: req.user });
// });

export default loginRouter;
