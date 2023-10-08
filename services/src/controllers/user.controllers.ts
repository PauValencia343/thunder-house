
import { Request, Response } from "express";

import {
  RoleEntity,
  UserEntity,
  UserInterface,
} from "../entity";
import { generatePassword } from "../helpers";


export const userGet = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;
    const userFound = await UserEntity.findOne({
      where: {
        uuid,
      },
      relations: {
        roles: true,
      },
    });
    return res.status(200).json({
      user: userFound,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const userGetAll = async (req: Request, res: Response) => {
  const { limit = 10, page = 1 } = req.query;
  const parsedPage = parseInt(page as string, 10);
  const parsedLimit = parseInt(limit as string, 10);
  const skip = (parsedPage - 1) * parsedLimit;
  try {
    const [list, count] = await Promise.all([
      UserEntity.find({
        skip,
        take: parsedLimit,
        relations: {
          roles: true,
        },
      }),
      UserEntity.count(),
    ]);
    const listResult = list.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
    
    return res.status(200).json({
      list: listResult,
      count,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const userPut = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const { password, email, user_name, roles, status } = req.body;
  try {
    const userFound = await UserEntity.findOneBy({
      uuid
    });
    userFound!.checkUpdate({
      email,
      user_name,
      status,
      password: generatePassword(password),
      roles,
    } as UserInterface);
    UserEntity.update(uuid, userFound!);

    const user: any = { ...userFound };
    delete user.password;
    
    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const userPost = async (req: Request, res: Response) => {
  const { email, user_name, password } = req.body;
  try {
    const newUser = new UserEntity();
    newUser.email = email;
    newUser.user_name = user_name;
    newUser.password = generatePassword(password);
    await newUser.save();

    const user: any = { ...newUser };
    delete user.password;
    
    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while creating the user.",
    });
  }
};


export const userDelete = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  try {
    const userFound = await UserEntity.findOne({ where: { uuid } });
    if (!userFound) {
      return res.status(404).json({ error: "User not found" });
    }
    userFound.status = false;
    await userFound.save();
    // const authenticatedUser = req.user;
    
    const user: any = { ...userFound };
    delete user.password;
    
    return res.status(200).json({
      user,
      // authenticatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
