
import { Router } from 'express';
import { check } from 'express-validator';
import { login } from '../controllers/auth.controllers';
import { validarCampos } from '../middlewares/validar-campos';

const router = Router();

router.post('/login', [
  check('correo', 'El correo no es válido').isEmail(),
  check('password', 'El password es obligatorio').not().isEmpty(),
  validarCampos
], login);


export default router;
