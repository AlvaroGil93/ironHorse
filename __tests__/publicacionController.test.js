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
  const testPub = {
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

        const postPub = await new publicacionModel(testPub).save()
        const res = await supertest(app).get('/publicaciones/obtener')
        expect(res.statusCode).toBe(200);

  })

  it("Debería obtener una publicación inexistente por Id", async () => {
    const postPub = await new publicacionModel(testPub).save();

    const res = await supertest(app).get('/publicaciones/obtener/' + "67972a3af82530481d06e79b");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message', 'Publicación no encontrada')

   

});

it('Deberia crear una publicacion', async()=>{
  const res = await supertest(app).post('/publicaciones/crear').send(testPub);
  expect(res.statusCode).toBe(201);


});
it('Debería actualizar por id una publicacion', async () => {

  const postPub = await new publicacionModel(testPub).save()
  const res = await supertest(app).put('/publicaciones/actualizar/' + postPub._id).send({
      title: "vamos a darle",content: "Vida loca"
  })

  expect(res.statusCode).toBe(200);

});
it('Debería devolver un error al eliminar una publicación inexistente', async () => {
  const res = await supertest(app).delete('/publicaciones/eliminar/' + "672ac14211af7bf45befebf3");
  
  // Verificar que devuelve un código de estado 404
  expect(res.statusCode).toBe(404);
  
  // Verificar que el mensaje de error es el esperado
  expect(res.body).toHaveProperty('message', 'Publicación no encontrada');
});

  
})


