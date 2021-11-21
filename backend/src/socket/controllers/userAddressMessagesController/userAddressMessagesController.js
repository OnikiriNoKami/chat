import userAddressMessagesController from "../../../api/database/controllers/userAdressMessagesController";
import ApiError from "../../../errors/apiErros/apiError";
import events from "../../utils/socketEventTypes/userAddressMessagesEventTypes/userAddressMessagesEventTypes";
import { NO_DATA_PROVIDED } from "../../../errors/utils/errorMessages";
const userAddressMessagesSocketController = (socket) => {
    socket.on(events.getByUser, async ({ user }) => {
        if (!user) {
            socket.emit(
                events.getByUser,
                ApiError.badRequestSerialized(NO_DATA_PROVIDED)
            );
        } else {
            userAddressMessagesController
                .getByUser(user)
                .then((result) => {
                    socket.emit(events.getByUser, result);
                })
                .catch((error) => {
                    socket.emit(
                        events.getByUser,
                        ApiError.badRequestSerialized(error.message)
                    );
                });
        }
    });

    socket.on(events.getByUserAndAddress, async ({ user, address }) => {
        if (!user || !address) {
            socket.emit(
                events.getByUser,
                ApiError.badRequestSerialized(NO_DATA_PROVIDED)
            );
        } else {
            userAddressMessagesController
                .getByUserAndAddress({ user, address })
                .then((result) => {
                    socket.emit(events.getByUserAndAddress, result);
                })
                .catch((error) => {
                    socket.emit(
                        events.getByUserAndAddress,
                        ApiError.badRequestSerialized(error.message)
                    );
                });
        }
    });
};
export default userAddressMessagesSocketController;
