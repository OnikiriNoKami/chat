require("dotenv").config();
import mongoose from 'mongoose';
const APP_MONGO_URL = process.env.APP_MONGO_URL;
async function connectToMongo() {
    try {
        mongoose.connect(APP_MONGO_URL, () => {
            console.log("Connection with mongo established.");
        });
    } catch (e) {
        console.log("Could not connect.");
    }
}

export default connectToMongo;