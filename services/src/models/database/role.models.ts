
import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "../../database/config";
import UserRoleModel from "./user-role.models";

// Define the attributes (fields) for the RoleModel
type RoleAttributes = {
  uuid: string;
  role: string;
  status: boolean;
};

// Define the attributes that can be created without specifying 'uuid' (used for creating instances)
type RoleCreationAttributes = Optional<RoleAttributes, "uuid" | "status">;

// Create the RoleModel class extending the Sequelize Model class
class RoleModel extends Model<RoleAttributes, RoleCreationAttributes> {
  declare uuid: string;
  declare role: string;
  declare status: boolean;
  
  static associate(models: any) {
    this.belongsToMany(models.UserModel, {
      through: UserRoleModel,
      foreignKey: "fkCatRole",
      constraints: true,
    });
  }
}

// Initialize the RoleModel with its attributes and table settings
RoleModel.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "CatRole",
    modelName: "RoleModel",
  },
);


export default RoleModel;
