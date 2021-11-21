import Client from "socket.io-client";
import { errorType } from "../../../errors/utils/types";
import socketEvents from "../../../socket/utils/socketEventTypes";
import events from '../../../socket/utils/socketEventTypes/userAddressMessagesEventTypes/userAddressMessagesEventTypes';
describe('User address messages tests.', () => {
    let clientSocket, user, address;
    beforeEach(() => {
        const port = process.env.APP_PORT || 4332;
        clientSocket = new Client(`http://localhost:${port}`, {
            auth: {
                displayName: "TestUser",
                email: "testUser@email.com",
            },
        });
        user = "TestUser";
        address = "TestAddress";
    });

    afterEach(()=>{
        clientSocket.close();
    })

    test('Getting by user.', (done) => {
        clientSocket.on(socketEvents.connect, () => {
            clientSocket.on(events.getByUser, (payload) => {
                expect(payload[0]._id.toString()).toEqual('619509f9ab859b1a5a745c06');
                expect(payload[0].user).toBe(user);
                expect(payload[0].address).toBe(address);
                done();
            });
            clientSocket.emit(events.getByUser, {user});
        });
    })

    test('Getting by user&address', (done) => {
        clientSocket.on(socketEvents.connect, () => {
            clientSocket.on(events.getByUserAndAddress, (payload) => {
                expect(payload._id.toString()).toEqual('619509f9ab859b1a5a745c06');
                expect(payload.user).toBe(user);
                expect(payload.address).toBe(address);
                done();
            });
            clientSocket.emit(events.getByUserAndAddress, {user, address});
        });
    })


})