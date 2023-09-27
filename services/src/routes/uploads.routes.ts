
import { Router } from 'express';
import { check } from 'express-validator';

import {
  validarCampos,
  validarArchivoSubir
} from '../middlewares';
import {
  cargarArchivo,
  // actualizarImagen,
  mostrarImagen
} from '../controllers/uploads.controllers';
import { coleccionesPermitidas } from '../helpers';

const router = Router();

router.post('/', validarArchivoSubir, cargarArchivo);

router.get('/:coleccion/:id', [
  check('id', 'El id debe ser de mongo').isMongoId(),
  check('coleccion').custom(c => coleccionesPermitidas(c, ['users'])),
  validarCampos
], mostrarImagen);


export default router;
