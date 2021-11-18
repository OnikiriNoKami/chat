require("dotenv").config();
import mongoose from 'mongoose';
import connectToMongo from "../../api/database";
import userController from '../../api/database/controllers/userController';

describe('User address messages controller tests.', () => {
    let userId, displayName, email;

    beforeAll(async () => {
        await connectToMongo();
    });

    beforeEach(() => {
        displayName = "TestUser";
        email = "testUser@email.com";
    });

    // test("Creting user.", async()=>{
    //     const result = await userController.create({displayName, email});
    //     expect(result instanceof Error).toBe(false);
    //     expect(result.displayName).toBe(displayName);
    //     expect(result.email).toBe(email);
    //     userId = result._id;
    // })

    // test('Deleting user.', async()=>{
    //     const result = await userController.delete(userId);
    //     expect(result instanceof Error).toBe(false);
    //     expect(result.displayName).toBe(displayName);
    //     expect(result.email).toBe(email);
    // })
    test('Find user by email.', async()=>{
        const result = await userController.findUser({ email });
        expect(result instanceof Error).toBe(false);
        expect(result.displayName).toBe(displayName);
        expect(result.email).toBe(email);
    })

    test('Find user by displayNaame.', async()=>{
        const result = await userController.findUser({ displayName });
        expect(result instanceof Error).toBe(false);
        expect(result.displayName).toBe(displayName);
        expect(result.email).toBe(email);
    })

    test('Find user no data provided.', async()=>{
        const result = await userController.findUser();
        expect(result instanceof Error).toBe(true);
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })
    
})