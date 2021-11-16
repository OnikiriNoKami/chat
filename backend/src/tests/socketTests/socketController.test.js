import Client from "socket.io-client";

describe("Socket controller tests.", () => {
    let clientSocket;
    beforeAll((done) => {
        const port = process.env.APP_PORT || 4332;
        clientSocket = new Client(`http://localhost:${port}`);
        clientSocket.on("connect", done);
    });

    afterAll(() => {
        clientSocket.close();
    });
    test("Getting id from socket", (done) => {
        clientSocket.on("giveMeId", (payload) => {
            expect(payload.message).toBe("Your id.");
            expect(payload.id).not.toBeFalsy();
            done();
        });
        clientSocket.emit("giveMeId");
    })

    test("Emmiting to socket.", (done) => {
        clientSocket.on("hello", (arg) => {
            expect(arg).toBe("world");
            done();
        });
        clientSocket.emit("hello", "world");
    });
});
