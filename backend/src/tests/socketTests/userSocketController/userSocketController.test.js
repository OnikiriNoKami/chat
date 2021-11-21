import Client from "socket.io-client";
import { errorType } from '../../../errors/utils/types';
import events from '../../../socket/utils/socketEventTypes';

describe("User socket controller tests.", () => {
    let displayName, email;

    beforeEach(()=>{
        displayName = "TestUser";
        email = "testUser@email.com";        
    })

    test('Find user, data provided', (done) => {        
        const port = process.env.APP_PORT || 4332;
        const clientSocket = new Client(`http://localhost:${port}`, {
            auth: {
                displayName: "TestUser",
                email: "testUser@email.com",
            }
        });
        clientSocket.on(events.connect, () => {
            clientSocket.on(events.findUser, (payload) => {
                expect(payload.type).not.toBe(errorType);   
                expect(payload.displayName).toBe(displayName);
                expect(payload.email).toBe(email);
                clientSocket.close();
                done();
            })
            clientSocket.emit(events.findUser, {email, displayName})
        });        
    })

    test('Find user, data not provided', (done) => {

        const port = process.env.APP_PORT || 4332;
        const clientSocket = new Client(`http://localhost:${port}`, {
            auth: {
                displayName: "TestUser",
                email: "testUser@email.com",
            }
        });
        clientSocket.on(events.connect, () => {
            clientSocket.on(events.findUser, (payload) => {
                clientSocket.close();
                expect(payload.type).toBe(errorType);                
                done();
            })
            clientSocket.emit(events.findUser)
        });
    })    
});