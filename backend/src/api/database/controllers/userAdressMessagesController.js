import UserAddressMessages from "../schemas/userAddressMessagesSchema";
import mongoose from "mongoose";

const userAddressMessagesController = {
    create: async ({ user, address }) => {
        if (!user || !address) return new Error("No data provided.");
        const userAddress = new UserAddressMessages({ user, address });
        await userAddress.save();
        return userAddress;
    },
    delete: async (userAddressId) => {
        if (!userAddressId) return new Error("No id provided.");
        const result = UserAddressMessages.findByIdAndDelete(userAddressId);
        return result;
    },
    addMessage: async ({ user, address, messageId }) => {
        if (!user || !address || !messageId)
            return new Error("No data provadide");
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
    },
    addMessageToAddress: async ({ address, messageId }) => {
        if (!address || !messageId) return new Error("No data provided");
        const userAddresses = await UserAddressMessages.find({ address });
        if (!userAddresses.length)
            return new Error("No users with such address");
        for (let i = 0; i < userAddresses.length; i++) {
            if (
                !userAddresses[i].messages.some(
                    (message) => message.messageId.toString() === messageId
                )
            ) {
                userAddresses[i].messages.push({
                    messageId: mongoose.Types.ObjectId(messageId),
                    readStatus: false,
                });
                await userAddresses[i].save();
            }
        }
        return userAddresses;
    },
    removeMessage: async ({ user, address, messageId }) => {
        if (!user || !address || !messageId)
            return new Error("No data provadide");
        const userAddress = await UserAddressMessages.findOne({
            user,
            address,
        });
        if (!userAddress) return new Error("No such user address");
        userAddress.messages = userAddress.messages.filter(
            (message) => message.messageId.toString() !== messageId
        );
        await userAddress.save();
        return userAddress;
    },
    getByUserAndAddress: async ({ user, address }) => {
        if (!user || !address) return new Error("No data provided.");
        const result = await UserAddressMessages.findOne({ user, address });
        return result;
    },
    getByUser: async (user) => {
        if (!user) return new Error("No user provided");
        const result = await UserAddressMessages.find({ user });
        return result;
    },
};

export default userAddressMessagesController;
