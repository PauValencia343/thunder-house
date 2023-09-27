
require('dotenv').config();

import Server from './src/models/server.models';

const server = new Server();

server.listen();
server.updateDatabase();
