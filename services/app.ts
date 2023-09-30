
import dotenv from 'dotenv';
import Server from './src/models/server.models';
import argv from './src/config/yargs';
import generator from './src/generator';

dotenv.config();

const server = new Server;

server.listen();

if (argv.database) {
  (async ()=> {
    await generator();
  })();
}

