require("dotenv").config();
import mongoose from 'mongoose';
import connectToMongo from "../../api/database";
import userAddressMessagesController from "../../api/database/controllers/userAdressMessagesController";

describe('User address messages controller tests.', () => {
    let userAddressMessagesId, user, address, messageId;

    beforeAll(async () => {
        await connectToMongo();
    });

    beforeEach(() => {
        user = "TestUser";
        address = "TestAddress";
        messageId = "6194fa17706d304985943403";
    });

    // test('Creating user address messages.', async () => {
    //     const result = await userAddressMessagesController.create({user, address});
    //     expect(result).not.toBeFalsy();
    //     expect(result.address).toBe(address);
    //     expect(result.user).toBe(user);
    //     userAddressMessagesId = result._id;
    // })

    // test('Deleting user address messages.', async () => {
    //     const result = await userAddressMessagesController.delete(userAddressMessagesId);
    //     expect(result).not.toBeFalsy();
    //     expect(result._id.toString()).toEqual(userAddressMessagesId.toString());
    // })

    // test("Adding message to user address messages", async()=>{
    //     const result = await userAddressMessagesController.addMessage({user, address, messageId});
    //     expect(result).not.toBeFalsy();
    //     expect(result.user).toBe(user);
    //     expect(result.address).toBe(address);
    //     expect(result.messages.length).not.toBe(0);
    // })

    // test("Deleting message from user address messages", async()=>{
    //     const result = await userAddressMessagesController.removeMessage({user, address, messageId});
    //     expect(result).not.toBeFalsy();
    //     expect(result.user).toBe(user);
    //     expect(result.address).toBe(address);
    //     expect(result.messages.some(message => message.messageId.toString() === messageId)).toBeFalsy();
    // })

    test("Getting by user", async () => {
        const result = await userAddressMessagesController.getByUser('TestUser1');
        expect(result).not.toBeFalsy();
        expect(result.length).toBe(2);
    })

    test("Getting by user and address", async () => {
        const result = await userAddressMessagesController.getByUserAndAddress({user:'TestUser1', address:'TestAddress2'})
        expect(result).not.toBeFalsy();
        expect(result._id.toString()).toEqual('61951f5fc3e7465a6cffffa5');
    })

    test("Adding message to address.", async () => {
        const result = await userAddressMessagesController.addMessageToAddress({address:'TestAddress2', messageId:"6194fa17706d304985943403"})
        expect(result).not.toBeFalsy();
        expect(result.length).toBe(2);
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })
    
})