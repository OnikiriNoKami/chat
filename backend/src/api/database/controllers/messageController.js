import Message from "../schemas/messageSchema";
import mongoose from "mongoose";

const messageController = {
    create: async ({ sender, address, body }) => {
        if (!sender || !address || !body)
            return new Error("Something wrong with provided data.");
        try {
            const message = new Message({ sender, address, body });
            await message.save();
            return message;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    delete: async (messageId) => {
        if (!messageId) return new Error("No data provided.");
        try {
            const result = await Message.findByIdAndDelete(messageId);
            return result;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
    getBySenderAndAddress: async ({
        sender,
        address,
        limit = 25,
        lastMessageId,
    }) => {
        if (!sender) return new Error("No sender provided.");
        try {
            const result = await Message.find({
                _id: { $lt: mongoose.Types.ObjectId(lastMessageId) },
                sender: sender,
                address: address,
            })
                .sort({ createdAt: "desc" })
                .limit(limit);
            return result;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    },
};

export default messageController;
