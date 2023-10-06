import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../database/config";

type UserRoleAttributes = {
  id: number;
  fkCatRole: string;
  fkCatUser: string;
};

type RoleCreationAttributes = Optional<UserRoleAttributes, "id">;

class UserRoleModel extends Model<UserRoleAttributes, RoleCreationAttributes> {
  public id!: number;
  public fkCatRole!: string;
  public fkCatUser!: string;
}

UserRoleModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fkCatRole: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'CatRole',
        key: 'uuid',
      },
    },
    fkCatUser: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'CatUser',
        key: 'uuid',
      },
    },
  },
  {
    sequelize,
    tableName: "DetailUserRole",
    modelName: "UserRoleModel",
    timestamps: false,
  }
);

export default UserRoleModel;
