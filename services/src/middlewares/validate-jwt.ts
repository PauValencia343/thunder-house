
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";

import { UserEntity } from '../entity';


export const validateJWT = async( req: Request ,res: Response, next: NextFunction ) => {
  const token = req.header("token");
  if (!token) {
    return res.status(401).json({
      msg: "No token received",
    });
  }
  try {
    const { uid: uuid } = jwt.verify(
      token,
      process.env.SECRET_OR_PRIVATE_KEY || ""
    ) as JwtPayload;
    const user = await UserEntity.findOneBy({
      uuid
    });
    if (!user) {
      return res.status(401).json({
        msg: "Invalid token - User not found",
      });
    }
    if (!user.status) {
      return res.status(401).json({
        msg: "Invalid token - User status: false",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Invalid token",
    });
  }
};
