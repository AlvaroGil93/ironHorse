// 1. Importamos las dependencias y modulos que necesitamos
import express from "express";
import dotenv from "dotenv";
import { connectionMongo } from "./src/config/dataBase.js";
import publicacionRouter from './src/routes/publicacion.routes.js';
import adminRouter from "./src/routes/adminRoutes.js";
import { userRouter } from './src/routes/user.routes.js';
import cors from 'cors'; //importar la dependencia cors


import loginRouter from './src/routes/login.routes.js';
// 2. Configurar el uso de nuestro servidor
const app = express();
dotenv.config();
connectionMongo();

const port = process.env.PORT || 9000; 
console.log("PORT", port);
app.use(cors()); //permisos para que el backend pueda ser usado en el navegador

// Middlewares y rutas
app.use(express.json());
app.use('/publicaciones', publicacionRouter);
app.use('/admin', adminRouter); 
app.use('/usuarios',userRouter);//importe mis rutas
app.use('/login', loginRouter);


// 3. Ejecutar el servidor
app.listen(port, () => {
  console.log("We are connected to IronHorse on port", port);
});

export default app;