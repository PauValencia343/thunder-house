
import path from 'path';
import fs from 'fs';

import { Request, Response } from "express";

import { subirArchivo } from '../helpers';
import {
  Usuario,
} from '../models';

export const cargarArchivo = async (req: Request, res: Response) => {
  try {
    // const nombre = await subirArchivo( req.files, ['txt', 'md'], 'textos' );
    const nombre = await subirArchivo(req.files, undefined, 'img');
    res.json({
      nombre
    });
  } catch (error) {
    res.status(400).json({
      error
    });
  }
}

// const actualizarImagen = async( req: Request, res: Response ) => {
//     const { id, coleccion } = req.params;
//     let modelo;
//     switch ( coleccion ) {
//       case 'users':
//       modelo = await Usuario.findByPk( id );
//       if ( !modelo ) {
//         res.status(400).json({
//           msg: `No se encontró el usuario con el id ${ id }`
//         });
//       }
//       break;
//       case 'products':
//       modelo = await Producto.findByPk( id );
//       if ( !modelo ) {
//         res.status(400).json({
//           msg: `No se encontró el producto con el id ${ id }`
//         });
//       }
//       break;
//       default:
//       return res.json({ msg:  `No se sabe que hacer con la colección ${ coleccion }` });
//     }

//     // Limpiar imágenes previas
//     if ( modelo.img ) {
//       // Borrar imagen del servidor
//       const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img);
//       if ( fs.existsSync(pathImagen) ) {
//       fs.unlinkSync(pathImagen);
//       }
//     }

//     modelo.img = await subirArchivo( req.files, undefined, coleccion );
//     await modelo.save();
//     res.json({ modelo });

// }

export const mostrarImagen = async (req: Request, res: Response) => {
  const { id, coleccion } = req.params;
  let modelo;
  switch (coleccion) {
    case 'users':
      modelo = await Usuario.findByPk(id);
      if (!modelo) {
        res.status(400).json({
          sg: `No se encontró el usuario con el id ${id}`
        });
      }
      break;
    default:
      return res.json({ msg: `No se sabe que hacer con la colección ${coleccion}` });
  }

  if (modelo.img) {
    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }
  const pathNoImagen = path.join(__dirname, '../assets/no-image.jpg');
  return res.sendFile(pathNoImagen);
}
