import userController from "../../../api/database/controllers/userController";
const userSocketController = (socket) => {
    socket.on("findUser", async ({ email, displayName } = {}) => {
        if (!email && !displayName) {
            socket.emit("findUser", {status: 'error', message: 'No data provided.'});
        } else {
            const result = await userController.findUser({
                email,
                displayName,
            });
            if(result instanceof Error){
                socket.emit("findUser", {status: 'error', message: result.message});
            }else {
                socket.emit("findUser", result);
            }
            
        }
    });
};

export default userSocketController;
