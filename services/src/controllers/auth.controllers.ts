
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import UserModel from "./../models/database/user.models";
import { generateJWT } from "../helpers/generate-jwt";
import { Op } from "sequelize";


// Define a function called 'login' that handles login requests
export const login = async (req: Request, res: Response) => {
  const { credential, password } = req.body;
  try {
    const user = await UserModel.findOne({
      where: {
        [Op.or]: [
          { userName: credential },
          { email: credential },
        ],
      }
    });
    if (!user) {
      return res.status(400).json({
        msg: "Username or password is incorrect - email",
      });
    }
    if (!user.status) {
      return res.status(400).json({
        msg: "Username or password is incorrect - status: false",
      });
    }
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Username or password is incorrect - password",
      });
    }
    const token = await generateJWT(user.uuid);
    return res.json({
      credential,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Contact the system administrator",
    });
  }
};
