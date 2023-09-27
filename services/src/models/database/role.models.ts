
import { DataTypes } from 'sequelize';

import sequelize from '../../database/config';


const RoleModel = sequelize.define('cat_role', {
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
}, {
  tableName: 'cat_role',
}
);


export default RoleModel;
