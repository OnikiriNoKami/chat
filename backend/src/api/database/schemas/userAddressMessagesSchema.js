import mongoose from "mongoose";

const userAddressMessagesSchema = new mongoose.Schema({
    user: {type: String, required: true},
    adress: {type: String, required: true},
    messages: [{
        messageId: {type: mongoose.Types.ObjectId},
        readzStatus: {type: Boolean, default: false},
    }]
})

export default mongoose.model('UserAddressMesagess', userAddressMessagesSchema);