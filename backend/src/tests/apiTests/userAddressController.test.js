require("dotenv").config();
import mongoose from 'mongoose';
import connectToMongo from "../../api/database";
import userAddressMessagesController from "../../api/database/controllers/userAdressMessagesController";

describe('User address messages controller tests.', () => {
    let userAddressMessagesId, user, address;

    beforeAll(async () => {
        await connectToMongo();
    });

    beforeEach(() => {
        user = "TestUser";
        address = "TestAddress";
    });

    test('Creating user address messages.', async () => {
        const result = await userAddressMessagesController.create({user, address});
        expect(result).not.toBeFalsy();
        expect(result.address).toBe(address);
        expect(result.user).toBe(user);
        userAddressMessagesId = result._id;
    })

    test('Deleting user address messages.', async () => {
        const result = await userAddressMessagesController.delete(userAddressMessagesId);
        expect(result).not.toBeFalsy();
        expect(result._id.toString()).toEqual(userAddressMessagesId.toString());
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })
    
})