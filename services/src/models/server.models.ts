
import express, { Application } from "express";
import cors from "cors";
import fileUpload from "express-fileupload";

import sequelize from "../database/config";
import {
  UserRoute,
  RoleRoute,
  AuthRoute,
} from '../routes';

class Server {
  private app: Application;
  private port: number;
  private paths: {
    user: string;
    role: string;
    auth: string;
    search: string;
  };

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 8080;
    this.paths = {
      user: "/api/user",
      role: "/api/role",
      auth: "/api/auth",
      search: "/api/search",
    };
    // Connect to the database
    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB() {
    try {
      await sequelize.authenticate();
      console.log("Connected to the database successfully");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  middlewares() {
    // Enable CORS
    this.app.use(cors());
    // Parse request body as JSON
    this.app.use(express.json());
    // Serve static files from the "public" directory
    this.app.use(express.static("public"));
    // Enable file upload
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true, // Allow creating parent directories if they don't exist
      })
    );
  }

  routes() {
    // Configure routes for user, auth
    this.app.use(this.paths.user, UserRoute);
    this.app.use(this.paths.role, RoleRoute);
    this.app.use(this.paths.auth, AuthRoute);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server is running on port", this.port);
      console.log(`http://localhost:${this.port}/`);
    });
  }

}

export default Server;
