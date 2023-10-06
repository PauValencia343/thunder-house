
import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "../../database/config";
import UserRoleModel from "./user-role.models";

// Define the attributes (fields) for the UserModel
type UserAttributes = {
  uuid: string;
  email: string;
  userName: string;
  password: string;
  status: boolean;
};

// Define the attributes that can be created without specifying 'uuid' (used for creating instances)
type UserCreationAttributes = Optional<UserAttributes, "uuid" | "status">;

// Create the UserModel class extending the Sequelize Model class
class UserModel extends Model<UserAttributes, UserCreationAttributes> {
  declare uuid: string;
  declare userName: string;
  declare email: string;
  declare password: string;
  declare status: boolean;

  static associate(models: any) {
    this.belongsToMany(models.RoleModel, {
      through: UserRoleModel,
      foreignKey: "fkCatUser",
      constraints: true,
    });
  }
}

// Initialize the UserModel with its attributes and table settings
UserModel.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
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
    tableName: "CatUser",
    modelName: "UserModel",
  },
)


export default UserModel;
