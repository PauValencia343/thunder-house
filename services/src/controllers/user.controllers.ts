
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import UserModel from "./../models/database/user.models";
import { UserRoleModel } from "../models";


// Handler for getting a list of users
export const userGet = async (req: Request, res: Response) => {
  const { limit = 10, page = 1 } = req.query;
  const parsedPage = parseInt(page as string, 10);
  const parsedLimit = parseInt(limit as string, 10);
  const offset = (parsedPage - 1) * parsedLimit;
  const query = { status: true };
  try {
    // Find and count all users that meet the query criteria
    const users = await UserModel.findAndCountAll({
      where: query,
      limit: parseInt(limit as string),
      offset: offset,
    });
    return res.json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal server error"
    });
  }
};

// Handler for updating a user
export const userPut = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const { password, email, roles } = req.body;
  try {
    const userFound = await UserModel.findByPk(uuid);
    if (!userFound) {
      return res.status(404).json({ msg: "User not found" });
    }
    const salt = bcryptjs.genSaltSync();
    const newPassword = bcryptjs.hashSync(password, salt);
    const userName = email.split("@")[0];
    await userFound.update({
      email,
      userName,
      password: newPassword,
    });
    await UserRoleModel.destroy({
      where: {
        fkCatUser: uuid,
      },
    });
    for (const roleId of roles) {
      await UserRoleModel.create({
        fkCatRole: roleId,
        fkCatUser: uuid,
      });
    }
    const updatedUser = await UserModel.findByPk(uuid);
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Handler for creating a new user
export const userPost = async (req: Request, res: Response) => {
  const { email, password, roles } = req.body;
  const salt = bcryptjs.genSaltSync();
  const passwordHash = bcryptjs.hashSync(password, salt);
  const userName = email.split("@")[0];
  try {
    const newUser = await UserModel.create({
      email,
      userName,
      password: passwordHash,
    });
    for (const uuidRole of roles) {
      await UserRoleModel.create({
        fkCatRole: uuidRole,
        fkCatUser: newUser.uuid,
      });
    }
    return res.status(200).json({
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while creating the user.",
    });
  }
};


// Handler for soft-deleting a user
export const userDelete = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  try {
    // Find the user by uuid
    const usuario = await UserModel.findOne({ where: { uuid } });
    if (!usuario) {
      return res.status(404).json({ error: "User not found" });
    }
    // Update the user's status to false to "soft-delete" the user
    await usuario.update({ status: false });
    // Retrieve the authenticated user from the request (if available)
    const usuarioAutentificado = req.user;
    return res.json({ usuario, usuarioAutentificado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
