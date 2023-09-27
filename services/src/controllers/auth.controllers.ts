
import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import Usuario from './../models/database/user.models';
import { generarJWT } from '../helpers/generar-jwt';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await Usuario.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        msg: 'Usuario o contraseña no son correctos - correo'
      });
    }

    if (!user.estado) {
      return res.status(400).json({
        msg: 'Usuario o contraseña no son correctos - estatus: false'
      });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario o contraseña no son correctos - password'
      });
    }
    if (!user.estado) {
      return res.status(400).json({
        msg: 'Usuario o contraseña no son correctos - correo'
      });
    }

    const token = await generarJWT(user.id);
    res.json({
      correo,
      password,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Llame al administrador del sistema'
    });
  }
}

