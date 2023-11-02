
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
  roomExistsById,
  roomStatusExistsById,
} from "../../helpers/db-validators";
import { validateRoles } from "../../middlewares/validate-roles";
import {
  changeRoomStatus,
  getRoomsByFloor,
} from "../../controllers/actions/room.actions.controllers";


const router = Router();

router.put("/change-room-status/:id_cat_room", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_room", "field (id_cat_room) can not be empty").not().isEmpty(),
    param("id_cat_room", "field (id_cat_room) should be integer and greater than 0").isInt({ min: 1 }),
    param("id_cat_room").custom(roomExistsById()),
    check("id_cat_room_status", "field (id_cat_room_status) can not be empty").not().isEmpty(),
    check("id_cat_room_status", "field (id_cat_room_status) should be integer and greater than 0").isInt({ min: 1 }),
    check("id_cat_room_status").custom(roomStatusExistsById()),
    validateFields,
  ],
  changeRoomStatus,
);

router.get("/get-by-floor/:id_cat_floor", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_floor", "field (id_cat_floor) can not be empty").not().isEmpty(),
    param("id_cat_floor", "field (id_cat_floor) should be integer and greater than 0").isInt({ min: 1 }),
    param("id_cat_floor").custom(floorExistsById()),
    validateFields,
  ],
  getRoomsByFloor,
);

export default router;
