import { Server } from "socket.io";
import userDataCredentials from "../middlewares/socketMiddlewares/credentialsMidleware/userDataCredentials";
import socketController from "./controllers/socketController";

const ioServer = (app) => {
    const io = new Server(app);
    console.log('Socket io initialized.')

    io.use(userDataCredentials);
    io.on('connection', socket => socketController(socket));
    return io;
}

export default ioServer;