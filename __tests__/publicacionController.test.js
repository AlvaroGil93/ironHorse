import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import publicacionModel from "../src/models/publicacion.model.js";

describe("Prueba de controladores publicacion", () => {
  beforeEach(async () => {
    // Borra todos los documentos almacenados en la colección de publicaciones.
    await publicacionModel.deleteMany({});
  });

  afterAll(async () => {
    // Cerrar la conexión con MongoDB después de que todas las pruebas hayan finalizado.
    await mongoose.connection.close();
  });

  // Objeto de prueba.
  const testpub = {
    title: "Esta es una prueba",
    image_url: "https://example.com/image.jpg",
    description: "Descripción de prueba",
    content: "Contenido de prueba",
    author: "Autor de prueba",
    createdAt: new Date().toISOString(),
  };

  it("Debería mostrar que no hay publicaciones", async () => {
    const res = await supertest(app).get('/publicaciones/obtener')
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'No hay publicaciones almacenadas')
  });

  //mostrar publicacion
  it('Deberia obtener publicacion' ,async ()=>{

        const postPub = await new publicacionModel(testpub).save()
        const res = await supertest(app).get('/publicaciones/obtener')
        expect(res.statusCode).toBe(200);

  })

  it("Debería obtener publicación por ID", async () => {
    const postPub = await new publicacionModel(testpub).save();

    const res = await supertest(app).get('/publicaciones/obtener/' + "67972a3af82530481d06e79b");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Publicación no encontrada')

   

});

it('Deberia crear una publicacion', async()=>{
  const res = await supertest(app).post('/publicaciones/crear').send(testpub);

});

it('Deberia actualizar publicacion por ID',async()=>{
  const res = await supertest(app).put('/publicaciones/actualizar/:id').send(testpub);

})



});
