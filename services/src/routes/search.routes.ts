
import { Router } from 'express';
import { buscar } from '../controllers/buscar.controllers';

const router = Router();

router.get('/:coleccion/:termino', buscar);


export default router;
