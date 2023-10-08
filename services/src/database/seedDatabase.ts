
import { EntityManager } from "typeorm";
import bcryptjs from "bcryptjs";

import {
  RoleEntity,
  UserEntity,
} from "../entity";
import AppDataSource from "./config";


const seedDatabase = async () => {
  await truncateTables();
  await generateUsers();
};

const generateUsers = async () => {
  const newRole = new RoleEntity();
  newRole.role = "Administrator";
  await newRole.save();
  
  const newUser = new UserEntity();
  newUser.email = "testUser@gmail.com";
  newUser.user_name = "testUser";
  ;
  newUser.password = bcryptjs.hashSync('12345_abAB', bcryptjs.genSaltSync());
  newUser.roles = [
    newRole
  ];
  await newUser.save();
}

const truncateTables = async () => {
  const manager = new EntityManager(AppDataSource);
  await manager.query(`DELETE FROM detail_user_role`);
  await manager.query(`DELETE FROM cat_role`);
  await manager.query(`DELETE FROM cat_user`);
}

export default seedDatabase;


