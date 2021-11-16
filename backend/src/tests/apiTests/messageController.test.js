require("dotenv").config();
import connectToMongo from "../../api/database";
import messageController from "../../api/database/controllers/messageController";

describe('Message controller tests.', ()=>{

    beforeAll(async ()=>{
        await connectToMongo();
    })

    test('Creating message', async () => {
        const sender = 'test sender';
        const address = 'test adress';
        const body = 'test body';
        const result = await messageController.create({sender, address, body});
        expect(result._id).not.toBeFalsy();
        expect(result.address).toBe(address);
        expect(result.sender).toBe(sender);
        expect(result.body).toBe(body);         
    })
})