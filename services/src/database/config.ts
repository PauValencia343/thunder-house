
import { Options, Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "mssql",
  dialectModulePath: "msnodesqlv8/lib/sequelize",
  dialectOptions: {
    trustedConnection: true,
  },
  server: "IVAN",
  database: "db_thunder_house",
} as Options);

export default sequelize;
