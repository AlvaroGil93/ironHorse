import mongoose from 'mongoose';


const adminSchema = new mongoose.Schema({
    // Nombre de usuario único y requerido para identificar al administrador
    username: { type: String, required: true, unique: true },
  
    // Correo electrónico  para el inicio de sesión y comunicación
    email: { type: String, required: true, unique: true },
  
    // Contraseña del administrador
    password: { type: String, required: true },
  
    // Rol del administrador que define el nivel de acceso('superadmin').
    //  El administrador puede editar publicaciones de usuarios.
    role: { type: String, enum: ['superadmin'] },
  
    // Aqui se define los permisos específicos del administrador
    permissions: {
      // Permiso para crear publicaciones
      content: { type: String, required: true },
      // Permiso para editar publicaciones, activado por defecto
      editPost: { type: Boolean, default: true },
      // Permiso para eliminar publicaciones, desactivado por defecto
      deletePost: { type: Boolean, default: true },
      // Permiso para gestionar categorías en el blog, desactivado por defecto
      manageCategories: { type: Boolean, default: true },
      // Permiso para gestionar otros usuarios, desactivado por defecto esto ayuda a limitar el acceso es decir solo abra un administrador 
      manageUsers: { type: Boolean, default: true },
    },
  
    // Fecha de creación del administrador, se asigna automáticamente la fecha actual
    createdAt: { type: Date, default: Date.now },
  
    // Fecha de última actualización del perfil del administrador, que puede actualizarse al realizar cambios
    updatedAt: { type: Date }
  });
  

export const AdminModel = mongoose.model("Admin", adminSchema);
