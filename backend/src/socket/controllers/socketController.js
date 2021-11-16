const socketController = (socket) => {
    console.log('New connection, id:', socket.id);
    socket.on('giveMeId', () => {
        socket.emit('giveMeId', {message: 'Your id.', id: socket.id});
    })
    socket.on('hello', ()=>{
        socket.emit('hello', 'world');
    })
}

export default socketController;