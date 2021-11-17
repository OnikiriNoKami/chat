import UserAddressMessages from "../schemas/userAddressMessagesSchema";
import mongoose from 'mongoose';

const userAddressMessagesController = {
    create: async ({user, address}) => {
        if(!user || !address) return new Error("No data provided.")
        try{
            const userAddress = new UserAddressMessages({user, address});
            await userAddress.save();
            return userAddress;
        } catch (error){
            console.log(error.message);
            return error
        }
    },
    delete: async(userAddressId) => {
        if(!userAddressId) return new Error('No id provided.');
        try{
            const result = UserAddressMessages.findByIdAndDelete(userAddressId);
            return result;
        } catch (error){
            console.log(error.mesage)
            return error;
        }
    }
}

export default userAddressMessagesController;