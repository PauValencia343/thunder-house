
import { UserModel, RoleModel } from "../models/index";

// Check if a given email exists in the database
export const emailExists = async (email = "") => {
  const emailExists = await UserModel.findOne({
    where: { email },
  });
  if (emailExists) {
    throw new Error(
      `The email ${email} has already been registered in the database`
    );
  }
  return true;
};

// Check if a user with a given ID exists in the database
export const userExistsById = async (uuid: string) => {
  const userExists = await UserModel.findByPk(uuid);
  if (!userExists) {
    throw new Error(`The ID ${uuid} does not exist in the database - user`);
  }
  return true;
};

// Check if a given collection is allowed based on a list of allowed collections
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
