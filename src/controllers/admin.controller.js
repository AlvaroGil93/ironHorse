import bcrypt from 'bcryptjs';

import { AdminModel } from "../models/administrador.modelo.js";

// Crear nuevo administrador
export const createAdmin = async (req, res) => {
    try {
        const { username, email, password, role, permissions } = req.body;

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo administrador
        const newAdmin = new AdminModel({
            username,
            email,
            password: hashedPassword,
            role,
            permissions,
        });

        await newAdmin.save();
        res.status(201).json({ message: "Administrador creado exitosamente", admin: newAdmin });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el administrador", error });
    }
};

// Obtener todos los administradores
export const getAllAdmins = async (req, res) => {
    try {
        const admins = await AdminModel.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los administradores", error });
    }
};

// Obtener administrador por ID
export const getAdminById = async (req, res) => {
    try {
        const admin = await AdminModel.findById(req.params.id);
        if (!admin) return res.status(404).json({ message: "Administrador no encontrado" });
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el administrador", error });
    }
};

// Actualizar administrador
export const updateAdmin = async (req, res) => {
    try {
        const updates = req.body;

        // Si hay contraseña nueva, la encriptamos
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const updatedAdmin = await AdminModel.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!updatedAdmin) return res.status(404).json({ message: "Administrador no encontrado" });

        res.status(200).json({ message: "Administrador actualizado exitosamente", admin: updatedAdmin });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el administrador", error });
    }
};

// Eliminar administrador
export const deleteAdmin = async (req, res) => {
    try {
        const deletedAdmin = await AdminModel.findByIdAndDelete(req.params.id);
        if (!deletedAdmin) return res.status(404).json({ message: "Administrador no encontrado" });
        
        res.status(200).json({ message: "Administrador eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el administrador", error });
    }
};
