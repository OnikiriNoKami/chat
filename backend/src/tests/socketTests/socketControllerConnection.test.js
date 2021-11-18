import Client from "socket.io-client";

describe("Socket controller tests.", () => {    
    test('Opening connection with credentials.', (done) => {
        const port = process.env.APP_PORT || 4332;
        const clientSocket = new Client(`http://localhost:${port}`, {
            auth: {
                displayName: "TestUser",
                email: "testUser@email.com",
            }
        });
        clientSocket.on("connect", ()=>{
            clientSocket.close();
            done();
        });

        clientSocket.on("connect_error", (err) => {
            clientSocket.close();
            done(new Error(err.message));
        })
    })

    test('Opening connection without credentials.', (done) => {
        const port = process.env.APP_PORT || 4332;
        const clientSocket = new Client(`http://localhost:${port}`, {
            auth: {
            }
        });
        clientSocket.on("connect", ()=>{
            clientSocket.close();
            done(new Error('Connection should not be established.'));
        });

        clientSocket.on("connect_error", (err) => {
            clientSocket.close();
            done()
        })
    })

});