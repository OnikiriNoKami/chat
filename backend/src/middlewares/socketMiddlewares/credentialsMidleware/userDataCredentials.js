import userController from "../../../api/database/controllers/userController";
const userDataCredentials = async (socket, next) => {
    const {displayName, email} = socket.handshake.auth;

    if(!displayName || !email) return next(new Error('No user data provided.'));

    const result = await userController.findUser({displayName, email});

    if(!result) {
        const newUser = await userController.create({displayName, email})
        if(newUser instanceof Error) return next(newUser);
        socket.handshake.auth._id = newUser._id;
    };
    socket.handshake.auth._id = result._id;
    next();
}

export default userDataCredentials;