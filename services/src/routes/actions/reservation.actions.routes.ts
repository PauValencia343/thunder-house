
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
  registerOutput,
} from "../../controllers/actions/reservation.actions.controllers";
import { 
  validateArrayRoomsReservationArrive,
  validateArrayRoomsReservationOutput,
  validateExistingArrayRooms,
} from "../../helpers/validate-array-type";


const router = Router();

router.put("/register-arrive/:id_cat_reservation", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_reservation", "field (id_cat_reservation) can not be empty, should be integer, and greater than 0").not().isEmpty().isInt({ min: 1 }),
    check("detail_reservation_room").custom(validateArrayRoomsReservationArrive),
    validateFields,
    param("id_cat_reservation").custom(reservationExistsById),
    validateFields,
  ],
  registerArrive,
);


router.put("/register-output/:id_cat_reservation", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_reservation", "field (id_cat_reservation) can not be empty, should be integer, and greater than 0").not().isEmpty().isInt({ min: 1 }),
    check("detail_reservation_room").custom(validateArrayRoomsReservationOutput),
    validateFields,
    param("id_cat_reservation").custom(reservationExistsById),
    validateFields,
  ],
  registerOutput,
);


export default router;
