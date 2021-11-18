require("dotenv").config();
import mongoose from 'mongoose';
import connectToMongo from "../../api/database";
import addressController from '../../api/database/controllers/addressConttoller';
describe('User address messages controller tests.', () => {
    let addressId, address, addressToFind;

    beforeAll(async () => {
        await connectToMongo();
    });

    beforeEach(() => {
        address = 'testAddress';
        addressToFind = 'TestAddressTOFind';
    });

    // test("Creting address.", async()=>{
    //     const result = await addressController.create(address);
    //     expect(result instanceof Error).toBe(false);
    //     expect(result.address).toBe(address);
    //     addressId = result._id;
    // })

    // test('Deleting address.', async()=>{
    //     const result = await addressController.delete(addressId);
    //     expect(result instanceof Error).toBe(false);
    //     expect(result.address).toBe(address);
    // })
    test('Find address.', async()=>{
        const result = await addressController.findAddress(addressToFind);
        expect(result instanceof Error).toBe(false);
        expect(result.address).toBe(addressToFind);
    })

    test('Find address no data provided.', async()=>{
        const result = await addressController.findAddress();
        expect(result instanceof Error).toBe(true);
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })
    
})