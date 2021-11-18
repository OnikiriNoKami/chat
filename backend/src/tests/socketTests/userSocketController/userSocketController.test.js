import Client from "socket.io-client";

describe("Socket controller tests.", () => {
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
        clientSocket.on("connect", () => {
            clientSocket.on('findUser', (payload) => {
                expect(payload instanceof Error).toBe(false);
                expect(payload.displayName).toBe(displayName);
                expect(payload.email).toBe(email);
                clientSocket.close();
                done();
            })
            clientSocket.emit('findUser', {email, displayName})
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
        clientSocket.on("connect", () => {
            clientSocket.on('findUser', (payload) => {
                clientSocket.close();
                console.log(payload)
                expect(payload.status).toBe('error');                
                done();
            })
            clientSocket.emit('findUser')
        });
    })    
});