import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    displayName: { type: String, required: true },
    email: { type: String, required: true },
})

export default mongoose.model("ChatUser", userSchema);