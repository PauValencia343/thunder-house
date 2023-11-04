
import "reflect-metadata";
require('dotenv').config();

import Server from './models/server.models';

const server = new Server;

server.listen();
server.connectDB();

export default server;
