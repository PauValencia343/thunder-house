
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import Usuario from './../models/database/user.models';

export const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('token');
  if (!token) {
    return res.status(401).json({
      msg: 'No se recibió token'
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY || '') as JwtPayload;
    const user = await Usuario.findByPk(uid);

    if (!user) {
      return res.status(401).json({
        msg: 'Token no válido - Usuario no encontrado'
      });
    }

    if (!user.estado) {
      return res.status(401).json({
        msg: 'Token no válido - Usuario estado: false'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token no válido'
    });
  }
}
