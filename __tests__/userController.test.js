import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import { UserModel } from "../src/models/user.model.js";

// 2. Definir los bloques de prueba, usamos el describe.
describe('Pruebas de los controladores de los usuarios', () => {

  
    beforeEach(async () => {
        // Borra todos los documentos almacenados en la colección de usuarios.
        await UserModel.deleteMany({});
    });

    // Cerrar la conexión con MongoDB después de que todas las pruebas hayan finalizado.
    afterAll(async () => {
        await mongoose.connection.close();
    });

    // Definimos un objeto que representará a un usuario de prueba.
    const testUser = {
        username: 'Juan Rodriguez',
        email: 'juan@gmail.com',
        password: '123'
    };

    // 2.1 Defino el bloque de pruebas para la petición POST.
    describe('Pruebas POST /users', () => {

       

        // Caso 1: Creación de usuarios de forma exitosa.
        it('Debería crear un usuario correctamente', async () => {
            // Realizamos la petición POST enviando los datos del usuario de prueba.
            const res = await supertest(app).post('/usuarios').send(testUser);

            // Verificamos que la respuesta tenga un código de estado 201 (creado exitosamente).
        });

        // Caso 2: Error cuando falta un campo obligatorio al crear un usuario.
        it('Debería devolver un error al crear un usuario', async () => {
            const res = await supertest(app).post('/usuarios/crear').send({
                email: 'juan@gmail.com',
                password: '123'
            })

            //Definir que esperamos de esa respuesta
            expect(res.body).toHaveProperty('mensaje', 'Ocurrió un error al crear el usuario')
        })
    });

    // 2.2 Defino el bloque de pruebas para la petición GET.
    describe('Pruebas GET /users', () => {

        /*
        Casos a probar para la petición GET:
            - Cuando no hay usuarios almacenados.
            - Cuando existen usuarios almacenados y queremos obtenerlos correctamente.
        */

        // Caso 1: Indicar que no hay usuarios almacenados en la base de datos.
        it('Debería indicar que no hay usuarios almacenados', async () => {
            // Realizamos la petición GET a la ruta de usuarios.
            const res = await supertest(app).get('/usuarios/obtener');

            // Verificamos que el código de estado sea 200 (respuesta exitosa).
            expect(res.statusCode).toBe(200);

            // Verificamos que la respuesta contenga el mensaje esperado.
            expect(res.body).toHaveProperty('mensaje', 'No hay usuarios almacenados');
        });

        
    });
});