
import { Router } from 'express';
import { check } from 'express-validator';
import {
  userGet,
  userDelete,
  userPost,
  userPut,
} from '../controllers/user.controllers';
import {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole,
} from '../middlewares';
import {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} from '../helpers/db-validators';

const router = Router();


router.get('/', userGet);

router.put('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(esRoleValido).optional(),
  validarCampos
], userPut);

router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password es obligatorio').not().isEmpty(),
  check('password', 'El password debe tener más de 6 letras').isLength({ min: 6 }),
  // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
  // check('rol').custom( (rol) => esRoleValido(rol) ),
  check('rol').custom(esRoleValido),
  check('correo').custom(emailExiste),
  validarCampos
], userPost);


router.delete('/:id', [
  validarJWT,
  // esAdminRole,
  tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
], userDelete);


export default router;
