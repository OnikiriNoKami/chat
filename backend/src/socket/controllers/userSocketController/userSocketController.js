import userController from "../../../api/database/controllers/userController";
import ApiError from "../../../errors/apiErros/apiError";
import events from "../../utils/socketEventTypes/userEventTypes/userEventTypes";
import { NO_DATA_PROVIDED } from "../../../errors/utils/errorMessages";
const userSocketController = (socket) => {
    socket.on(
        events.findUser,
        async ({ email, displayName } = { NO_DATA_PROVIDED }) => {
            if (!email && !displayName) {
                socket.emit(events.findUser, ApiError.badRequestSerialized());
            } else {
                userController
                    .findUser({
                        email,
                        displayName,
                    })
                    .then((result) => {
                        socket.emit(events.findUser, result);
                    })
                    .catch((error) => {
                        socket.emit(
                            events.findUser,
                            ApiError.badRequestSerialized(error.message)
                        );
                    });
            }
        }
    );

    socket.on(events.createUser, async ({email, displayName}) => {
        if(!email || !displayName) {
            socket.emit(events.createUser, ApiError.badRequestSerialized());
        } else {
            userController.create({displayName, email})
            .then(result => {
                socket.emit(events.createUser, result);
            })
            .catch(error => {
                socket.emit(
                    events.createUser,
                    ApiError.badRequestSerialized(error.message)
                );
            })
        }
    })
};

export default userSocketController;
