
import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';

import UserModel from './../models/database/user.models';


export const userGet = async (req: Request, res: Response) => {
  const { limit = 10, page = 1 } = req.query;
  const query = { estado: true };
  let options = {
    offset: getOffset(page, limit),
    limit: limit,
  };
  const users = await UserModel.findAndCountAll({
    offset: ((page * limit) - limit),
    limit: limit,
  });
  return res.json({ users });
};

export const userPut = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const { _uuid, password, correo, ...rest } = req.body;
  try {
    const user = await UserModel.findByPk(uuid);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    if (password) {
      const salt = bcryptjs.genSaltSync();
      rest.password = bcryptjs.hashSync(password, salt);
    }
    await user.update(rest);
    const updatedUser = await UserModel.findByPk(uuid);
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const userPost = async (req: Request, res: Response) => {
  const { name, last_name, email, password, fkRol } = req.body;
  const uuid = 'uuid';
  const salt = bcryptjs.genSaltSync();
  const passwordHash = bcryptjs.hashSync(password, salt);
  const status = true;
  const userName = email.split('@')[0];
  
  const newUser = new UserModel({
    uuid,
    name,
    last_name,
    email,
    userName,
    password: passwordHash,
    fkRol,
    status
  });
  
  await newUser.save();
  
  return res.status(200).json({
    user: newUser
  });
};

export const userDelete = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const usuario = await UserModel.findOneAndUpdate({ '_uuid': uuid }, { estado: false });
  const usuarioAutentificado = req.user;
  res.json({ usuario, usuarioAutentificado });
};
