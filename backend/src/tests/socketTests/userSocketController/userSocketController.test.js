import Client from "socket.io-client";
import { errorType } from "../../../errors/utils/types";
import socketEvents from "../../../socket/utils/socketEventTypes";
import events from '../../../socket/utils/socketEventTypes/userEventTypes/userEventTypes';

describe("User socket controller tests.", () => {
    let clientSocket, displayName, email;

    beforeEach(() => {
        const port = process.env.APP_PORT || 4332;
        clientSocket = new Client(`http://localhost:${port}`, {
            auth: {
                displayName: "TestUser",
                email: "testUser@email.com",
            },
        });
        displayName = "TestUser";
        email = "testUser@email.com";
    });

    afterEach(()=>{
        clientSocket.close();
    })

    test("Find user, data provided", (done) => {
        clientSocket.on(socketEvents.connect, () => {
            clientSocket.on(events.findUser, (payload) => {
                expect(payload.type).not.toBe(errorType);
                expect(payload.displayName).toBe(displayName);
                expect(payload.email).toBe(email);
                done();
            });
            clientSocket.emit(events.findUser, { email, displayName });
        });
    });

    test("Find user, data not provided", (done) => {   
        clientSocket.on(socketEvents.connect, () => {
            clientSocket.on(events.findUser, (payload) => {
                expect(payload.type).toBe(errorType);
                done();
            });
            clientSocket.emit(events.findUser);
        });
    });

    test("Create user. Already exist.", (done) => {
        clientSocket.on(socketEvents.connect, () => {
            clientSocket.on(events.createUser, (payload) => {
                expect(payload.type).toBe(errorType);
                done();
            });
            clientSocket.emit(events.createUser, {email, displayName});
        });
    })
});
