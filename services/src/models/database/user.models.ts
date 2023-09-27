
import {
  DataTypes,
  Model,
  Optional,
} from 'sequelize';

import sequelize from '../../database/config';

type UserAttributes = {
  uuid: string,
  name: string,
  last_name: string,
  email: string,
  userName: string,
  password: string,
  fkRol: string,
  status: boolean,
};

type UserCreationAttributes = Optional<UserAttributes, 'uuid'>;

class UserModel extends Model<UserAttributes, UserCreationAttributes> {
  declare uuid: string;
  declare name: string;
  declare last_name: string;
  declare userName: string;
  declare email: string;
  declare password: string;
  declare fkRol: string;
  declare status: boolean;
}

UserModel.init({
  uuid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
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
  fkRol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'cat_user',
  modelName: 'UserModel',
  sequelize,
});

export default UserModel;
