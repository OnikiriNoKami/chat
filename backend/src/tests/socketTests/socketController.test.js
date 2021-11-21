import Client from "socket.io-client";
import  events from '../../socket/utils/socketEventTypes';

describe("Socket controller tests.", () => {
    let clientSocket;
    beforeAll((done) => {
        const port = process.env.APP_PORT || 4332;
        clientSocket = new Client(`http://localhost:${port}`, {
            auth: {
                displayName: "TestUser",
                email: "testUser@email.com",
            }
        });
        clientSocket.on(events.connect, done);
    });

    afterAll(() => {
        clientSocket.close();
    });

    test("Getting id from socket", (done) => {
        clientSocket.on(events.giveMyId, (payload) => {
            expect(payload.message).toBe("Your id.");
            expect(payload.id).not.toBeFalsy();
            done();
        });
        clientSocket.emit(events.giveMyId);
    })

    test("Emmiting to socket.", (done) => {
        clientSocket.on(events.hello, (arg) => {
            expect(arg).toBe("world");
            done();
        });
        clientSocket.emit(events.hello, "world");
    });
});
