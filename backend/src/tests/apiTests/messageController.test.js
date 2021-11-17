require("dotenv").config();
import mongoose from 'mongoose';
import connectToMongo from "../../api/database";
import messageController from "../../api/database/controllers/messageController";

describe("Message controller tests.", () => {
    let messageId, sender, address, body;
    beforeAll(async () => {
        await connectToMongo();
    });

    beforeEach(() => {
        sender = "test sender";
        address = "test adress";
        body = "test body";
    });
    // test('Creating message', async () => {
    //     const result = await messageController.create({sender, address, body});
    //     expect(result._id).not.toBeFalsy();
    //     expect(result.address).toBe(address);
    //     expect(result.sender).toBe(sender);
    //     expect(result.body).toBe(body);
    //     messageId = result._id;
    // })

    // test('Deleting message', async() => {
    //     const result = await messageController.delete(messageId);
    //     expect(result._id).not.toBeFalsy();
    //     expect(result.address).toBe(address);
    //     expect(result.sender).toBe(sender);
    //     expect(result.body).toBe(body);
    // })

    test("Retriving 5 test messages from first", async () => {
        const result = await messageController.getBySenderAndAddress({
            sender: "Sender1",
            address: "multipleGetTest",
        });
        expect(result.length).toBe(5);
        expect(result[0]._id.toString()).toEqual("6194fc696bcd70cdcb5e1a57");
    });
    test("Retriving 4 test messages from second", async () => {
        const result = await messageController.getBySenderAndAddress({
            sender: "Sender1",
            address: "multipleGetTest",
            lastMessageId: "6194fc696bcd70cdcb5e1a57",
        });
        expect(result.length).toBe(4);
        expect(result[0]._id.toString()).toEqual("6194fc696bcd70cdcb5e1a55");
    });
    test("Retriving 1 test message from second", async () => {
        const result = await messageController.getBySenderAndAddress({
            sender: "Sender1",
            address: "multipleGetTest",
            lastMessageId: "6194fc696bcd70cdcb5e1a57",
            limit:1,
        });
        expect(result.length).toBe(1);
        expect(result[0]._id.toString()).toEqual("6194fc696bcd70cdcb5e1a55");
    });

    afterAll(async () => {
        await mongoose.connection.close();        
    })
});
