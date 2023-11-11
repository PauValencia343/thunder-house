
import { Router } from "express";
import { check, param } from "express-validator";

import {
} from "../../controllers/catalogs/equipment.controllers";
import {
  validateFields,
  validateJWT,
} from "../../middlewares";
import {
  floorExistsById,
  reservationExistsById,
} from "../../helpers/db-validators";
import { validateRoles } from "../../middlewares/validate-roles";
import {
  registerArrive,
} from "../../controllers/actions/reservation.actions.controllers";


const router = Router();

router.put("/register-arrive/:id_cat_reservation", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_reservation", "field (id_cat_reservation) can not be empty").not().isEmpty(),
    param("id_cat_reservation", "field (id_cat_reservation) should be integer and greater than 0").isInt({ min: 1 }),
    param("id_cat_reservation").custom(reservationExistsById()),
    validateFields,
  ],
  registerArrive,
);

export default router;
