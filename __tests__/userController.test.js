import supertest from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import { UserModel } from "../src/models/user.model.js";


describe('Pruebas de los controladores de los usuarios'),()=>{

    BeforeEach(async()=>{
await UserModel.deleteMany({});
    });

    afterAll(async()=>{
await mongoose.connection.close();
    });

   const testUser = {
        username: 'Carlos Rodriguez',
        email: 'carlos@gmail.com',
        password: '123'
   } ;

   describe('Prueba POST /users',()=>{

    it('Deberia Crear un usuario exitosamente',async()=>{
        const res = await supertest(app).post('/usuarios').send(testUser);

        expect(res.statusCode).toBe(201);

    });

    it('Deberia devolver un error si falta un campo')

   });



}