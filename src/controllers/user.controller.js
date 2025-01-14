import { UserModel } from "../models/user.model.js";
import bcrypt from 'bcryptjs';


// Crear usuario (POST)
export const createUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Validar si el usuario ya existe
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                mensaje: "El correo electrónico ya está registrado.",
            });
        }

        // Encriptar la contraseña
        const codedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const newUser = await UserModel.create({
            username,
            email,
            password: codedPassword,
            role
        });

        return res.status(201).json({
            mensaje: "Usuario creado correctamente",
            datos: newUser
        });
    } catch (error) {
        return res.status(400).json({
            mensaje: "Ocurrió un error al crear el usuario",
            problemas: error.message
        });
    }
};

// Mostrar todos los usuarios (GET)
export const showUsers = async (req, res) => {
    try {
        // Buscar todos los usuarios
        let users = await UserModel.find();

        // Validar si no se encuentran usuarios
        if (users.length === 0) {
            return res.status(200).json({
                mensaje: "No hay usuarios almacenados"
            });
        }

        // Respuesta exitosa con los usuarios
        return res.status(200).json({
            mensaje: "Se encontraron usuarios",
            numeroUsuarios: users.length,
            datos: users
        });
    } catch (error) {
        return res.status(400).json({
            mensaje: "Ocurrió un error al mostrar los usuarios",
            problema: error.message
        });
    }
};
