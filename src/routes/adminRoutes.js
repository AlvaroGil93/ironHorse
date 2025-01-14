import express from "express";
import {
    createAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin
} from "../controllers/admin.controller.js";

import authMiddleware from "../middleware/auth.js";

const adminRouter = express.Router();

// Ruta para crear un nuevo administrador
adminRouter.post("/crear",  createAdmin);

// Ruta para obtener todos los administradores
adminRouter.get("/obtener", authMiddleware("superadmin"), getAllAdmins);

// Ruta para obtener un administrador por su ID
adminRouter.get("/obtener/:id", authMiddleware("superadmin"), getAdminById);

// Ruta para actualizar un administrador
adminRouter.put("/actualizar/:id", authMiddleware("superadmin"), updateAdmin);

// Ruta para eliminar un administrador
adminRouter.delete("/eliminar/:id", authMiddleware("superadmin"), deleteAdmin);

export default adminRouter;
