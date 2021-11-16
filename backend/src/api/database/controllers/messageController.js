import Message from '../schemas/messageSchema';

const messageController = {
    create: async ({sender, address, body}) => {
        console.log(" in controller")
        if(!sender || !address || !body) return new Error("Something wrong with pdovided data.")
        try{
            const message = new Message({sender, address, body});
            await message.save();
            return message;
        } catch (error){
            console.log(error.message);
            return error;
        }
    }
}

export default messageController;