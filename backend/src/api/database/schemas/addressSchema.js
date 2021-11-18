import mongoose, { Mongoose } from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        address: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model('Address', addressSchema);
