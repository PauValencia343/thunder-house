
import { DataSource } from "typeorm";

import * as entities from "../entity/index";


export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.SERVER_DATABASE,
  port: parseInt(process.env.PORT_DATABASE || "3306") as number,
  username: process.env.USER_NAME_DATABASE,
  password: process.env.PASSWORD_DATABASE,
  database: process.env.NAME_DATABASE,
  synchronize: true,
  // logging: true,
  entities
});

export default AppDataSource;
