require("dotenv").config();
import express from 'express';
import cors from "cors";
import http from "http";
//import path from "path";
import ioServer from './socket';

const app = express();
const server = http.createServer(app);
ioServer(server);
const PORT = process.env.APP_PORT || 4332;

app.use(cors());
app.use(express.json());

async function start(){
    server.listen(PORT, ()=>{
        console.log(`Server listening on ${PORT}.`);
    })
}

start();
