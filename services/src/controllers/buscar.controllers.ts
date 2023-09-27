
import { Request, Response } from "express";
// import { ObjectId } from 'mongoose'.Types;

import {
  Usuario,
} from '../models';

const coleccionesPermitidas = [
  'users',
];

const buscarUsuarios = async (termino = '', res: Response) => {
  // const esMongoID = ObjectId.isValid( termino );
  const esMongoID = true;
  if (esMongoID) {
    const usuario = await Usuario.findByPk(termino);
    return res.json({
      results: (usuario) ? [usuario] : []
    });
  }
  const regex = new RegExp(termino, 'i');
  // Usuario.count({});
  const usuarios = await Usuario.find({
    $or: [
      { nombre: regex },
      { correo: regex }
    ],
    $and: [
      { estado: true }
    ]
  });
  res.json({
    results: usuarios
  });
};

export const buscar = (req: Request, res: Response) => {
  const { coleccion, termino } = req.params;
  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
    });
  }

  switch (coleccion) {
    case 'users':
      buscarUsuarios(termino, res);
      break;
    default:
      res.status(500).json({
        msg: 'Error del servidor'
      });
      break;
  }
}
