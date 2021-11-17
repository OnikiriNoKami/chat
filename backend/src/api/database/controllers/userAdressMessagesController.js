import UserAddressMessages from "../schemas/userAddressMessagesSchema";
import mongoose from "mongoose";

const userAddressMessagesController = {
    create: async ({ user, address }) => {
        if (!user || !address) return new Error("No data provided.");
        try {
            const userAddress = new UserAddressMessages({ user, address });
            await userAddress.save();
            return userAddress;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    delete: async (userAddressId) => {
        if (!userAddressId) return new Error("No id provided.");
        try {
            const result = UserAddressMessages.findByIdAndDelete(userAddressId);
            return result;
        } catch (error) {
            console.log(error.mesage);
            return error;
        }
    },
    addMessage: async ({ user, address, messageId }) => {
        if (!user || !address || !messageId)
            return new Error("No data provadide");
        try {
            let userAddress = await UserAddressMessages.findOne({
                user,
                address,
            });
            if (!userAddress)
                userAddress = await newUserAddressMessages({ user, address });
            if (
                !userAddress.messages.some(
                    (message) => message.messageId.toString() === messageId
                )
            ) {
                userAddress.messages.push({
                    messageId: mongoose.Types.ObjectId(messageId),
                    readStatus: false,
                });
            }

            await userAddress.save();
            return userAddress;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },

    removeMessage: async ({user, address, messageId}) => {
        if (!user || !address || !messageId)
            return new Error("No data provadide");
        try {
            const userAddress = await UserAddressMessages.findOne({
                user,
                address,
            });
            if (!userAddress) return new Error("No such user address");
            userAddress.messages = userAddress.messages.filter(message => message.messageId.toString() !== messageId);
            await userAddress.save();
            return userAddress;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    getByUserAndAddress: async ({user, address}) => {
        if(!user || !address) return new Error("No data provided.");
        try{
            const result = await UserAddressMessages.findOne({user, address});
            return result;
        } catch (error){
            console.log(error.message);
            return error;
        }
    },
    getByUser: async(user) => {
        if(!user) return new Error("No user provided");
        try{
            const result = await UserAddressMessages.find({user});
            return result;
        } catch(error){
            console.log(error.message);
            return error
        }
    },
};

export default userAddressMessagesController;
