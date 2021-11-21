import userSocketController from "./userSocketController/userSocketController";
import events from "../utils/socketEventTypes";
import userAddressMessagesSocketController from "./userAddressMessagesController/userAddressMessagesController";

const socketController = (socket) => {
    console.log('New connection, id:', socket.id);
    socket.on(events.giveMyId, () => {
        socket.emit(events.giveMyId, {message: 'Your id.', id: socket.id});
    })
    socket.on(events.hello, ()=>{
        socket.emit(events.hello, 'world');
    })
    userSocketController(socket);
    userAddressMessagesSocketController(socket)
}

export default socketController;