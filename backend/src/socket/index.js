import { Server } from "socket.io";
import socketController from "./controllers/socketController";

const ioServer = (app) => {
    const io = new Server(app);

    console.log('Socket io initialized.')
    io.on('connection', socket => socketController(socket));
    return io;
}

export default ioServer;