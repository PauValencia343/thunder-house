import bcryptjs from "bcryptjs";

import { RoleModel, UserModel, UserRoleModel } from "../models";
import sequelize from "../database/config";

const truncateTables = async () => {
  await UserRoleModel.destroy({ where: {}, cascade: true });
  await UserModel.destroy({ where: {}, cascade: true });
  await RoleModel.destroy({ where: {}, cascade: true });
}

const generateUserRole = async () => {
  const roles = await RoleModel.findAll({
    attributes: ['uuid']
  });
  const users = await UserModel.findAll({
    attributes: ['uuid']
  });
  users.forEach(user => {
    roles.forEach(async role => {
      await UserRoleModel.create({
        fkCatRole: role.uuid,
        fkCatUser: user.uuid,
      });
    });
  });
}

const generateUser = async () => {
  await UserModel.create({
    email: 'mainAdmin@gmail.com',
    userName: 'mainAdmin',
    password: bcryptjs.hashSync('admin1234', bcryptjs.genSaltSync()),
  });
  await UserModel.create({
    email: 'mainEmployee@gmail.com',
    userName: 'mainEmployee',
    password: bcryptjs.hashSync('employee1234', bcryptjs.genSaltSync()),
  });
}

const generateRole = async () => {
  await RoleModel.create({
    role: 'Administrator',
  });
  await RoleModel.create({
    role: 'Employee',
  });
}

const generator = async () => {
  await sequelize.sync();
  
  await truncateTables();

  await generateRole();
  await generateUser();
  await generateUserRole();
}

export default generator;
