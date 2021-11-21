import userSocketController from "./userSocketController/userSocketController";
import events from "../utils/socketEventTypes";

const socketController = (socket) => {
    console.log('New connection, id:', socket.id);
    socket.on(events.giveMyId, () => {
        socket.emit(events.giveMyId, {message: 'Your id.', id: socket.id});
    })
    socket.on(events.hello, ()=>{
        socket.emit(events.hello, 'world');
    })
    userSocketController(socket);
}

export default socketController;