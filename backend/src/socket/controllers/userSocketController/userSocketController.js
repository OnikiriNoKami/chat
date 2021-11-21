import userController from "../../../api/database/controllers/userController";
import ApiError from "../../../errors/apiErros/apiError";
import events from '../../utils/socketEventTypes';
import { NO_DATA_PROVIDED } from "../../../errors/utils/errorMessages";
const userSocketController = (socket) => {
    socket.on(events.findUser, async ({ email, displayName } = {NO_DATA_PROVIDED}) => {
        if (!email && !displayName) {
            socket.emit(events.findUser, ApiError.badRequestSerialized());
        } else {
            await userController
                .findUser({
                    email,
                    displayName,
                })
                .then((result) => {
                    socket.emit(events.findUser, result);
                })
                .catch((error) => {
                    socket.emit(events.findUser, ApiError.badRequestSerialized(error.message));
                });
        }
    });

};

export default userSocketController;
