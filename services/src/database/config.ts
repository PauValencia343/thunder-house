
import { Options, Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "mssql",
  dialectModulePath: "msnodesqlv8/lib/sequelize",
  dialectOptions: {
    trustedConnection: true,
  },
  server: process.env.SERVER_DATABASE,
  database: process.env.NAME_DATABASE,
} as Options);

export default sequelize;
