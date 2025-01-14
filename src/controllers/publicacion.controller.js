import Post from '../models/publicacion.model.js'; 
import mongoose from 'mongoose';
import publicacionModel from '../models/publicacion.model.js';

// Crear un nuevo post
// controllers/publicacion.Controller.js

export const getPublicacion = async (req, res) => {
  try {
    const publicaciones = await publicacionModel.find(); // Usando modelo para obtener publicaciones
    res.status(200).json(publicaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener publicaciones', error: error.message });
  }
};

export const getPublicacionById = async (req, res) => {
  try {
    const { id } = req.params;
    const publicacion = await publicacionModel.findById(id);
    
    if (!publicacion) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    res.status(200).json(publicacion);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la publicación', error: error.message });
  }
};

export const postPublicacion = async (req, res) => {
  try {
    const newPublicacion = await publicacionModel.create(req.body); // Crear publicación
    res.status(201).json(newPublicacion);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear publicación', error: error.message });
  }
};

export const putPublicacionById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPublicacion = await publicacionModel.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedPublicacion) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    res.status(200).json(updatedPublicacion);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar publicación', error: error.message });
  }
};

export const deletePublicacionById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPublicacion = await publicacionModel.findByIdAndDelete(id);
    
    if (!deletedPublicacion) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    res.status(200).json({ message: 'Publicación eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar publicación', error: error.message });
  }
};
