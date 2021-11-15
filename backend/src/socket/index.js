import { Server } from "socket.io";

const ioServer = (app) => {
    const io = new Server(app);

    console.log('Socket io initialized.')

    return io;
}

export default ioServer;