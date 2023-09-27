
import express, { Express } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import sequelize from '../database/config';

class Server {
  private app: Express;
  private port: number;
  private paths: {
    user: string;
    auth: string;
    search: string;
    uploads: string;
  };

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 8000;
    this.paths = {
      user: '/api/user',
      auth: '/api/auth',
      search: '/api/search',
      uploads: '/api/uploads'
    };
    // Conectar a base ded atos
    this.conectarDB();
    this.middlewares();
    this.routes();
  }

  async conectarDB() {
    await sequelize.authenticate();
  }

  middlewares() {
    // cors
    this.app.use(cors());
    // lectura y parseo de body
    this.app.use(express.json());
    // directorio público
    this.app.use(express.static('public'));
    // carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        // Permite crear directorios especificados
        createParentPath: true
      })
    );
  }

  routes() {
    this.app.use(this.paths.user, require('../routes/user.routes'));
    this.app.use(this.paths.auth, require('../routes/auth.routes'));
    this.app.use(this.paths.search, require('../routes/search.routes'));
    this.app.use(this.paths.uploads, require('../routes/uploads.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server is running in', this.port);
      console.log(`http://localhost:${this.port}/`);
    });
  }

  updateDatabase() {
    sequelize
      .sync()
      .then(() => {
        console.log('Tables created successfully!');
      })
      .catch((error) => {
        console.error('Unable to create tables : ', error);
      });
  }
}

export default Server;
