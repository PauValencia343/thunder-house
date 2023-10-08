
import { In } from "typeorm";
import {
  RoleEntity,
  UserEntity,
} from "../entity";


export const isUniqueUser = (fieldName: string, isSelf: boolean = false) => {
  return async (value: any, { req }: any) => {
    try {
      if (value === null) {
        return true;
      }
      const query: any = {};
      query[fieldName] = value;
      const existingUser = await UserEntity.findOneBy(query);
      if (existingUser) {
        if (isSelf) {
          const { uuid } = req.params;
          console.log(1);
          console.log(query);
          
          console.log(uuid);
          console.log(existingUser.uuid);
          if (existingUser.uuid === uuid) return true;
        }
        throw new Error(`${fieldName} is already in use`);
      }
      return true;
    } catch (error) {
      throw error;
    }
  };
};

export const userExistsById = async (uuid: string) => {
  const userExists = await UserEntity.findOneBy({
    uuid
  });
  if (!userExists) {
    throw new Error(`The User ID ${uuid} does not exist in the database`);
  }
  return true;
};

export const roleExistsById = async (uuid: string) => {
  const roleFound = await RoleEntity.findOneBy({
    uuid
  });
  if (!roleFound) {
    throw new Error(`The Role ID ${uuid} does not exist in the database`);
  }
  return true;
};

export const allowedCollections = (
  collection = "",
  collections: string[] = []
) => {
  const isAllowed = collections.includes(collection);
  if (!isAllowed) {
    throw new Error(
      `The collection ${collection} is not allowed, allowed collections: ${collections}`
    );
  }
  return true;
};

export const rolesExist = (isUpdate: boolean = false) => {
  return async (value: any, { req }: any) => {
    try {
      const { roles } = req.body;
      if (isUpdate && (roles === null)) {
        return true;
      }
      const existingRoles = await RoleEntity.findBy({
        uuid: In(value)
      });
      if (existingRoles.length !== value.length) {
        throw new Error('Not all role uuids exist in the database');
      }
      return true;
    } catch (error) {
      throw error;
    }
  };
};
