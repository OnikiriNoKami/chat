import Client from "socket.io-client";
import events from '../../socket/utils/socketEventTypes';

describe("Socket controller tests.", () => {    
    test('Opening connection with credentials.', (done) => {
        const port = process.env.APP_PORT || 4332;
        const clientSocket = new Client(`http://localhost:${port}`, {
            auth: {
                displayName: "TestUser",
                email: "testUser@email.com",
            }
        });
        clientSocket.on(events.connect, ()=>{
            clientSocket.close();
            done();
        });

        clientSocket.on(events.connectError, (err) => {
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
        clientSocket.on(events.connect, ()=>{
            clientSocket.close();
            done(new Error('Connection should not be established.'));
        });

        clientSocket.on(events.connectError, (err) => {
            clientSocket.close();
            done()
        })
    })

});