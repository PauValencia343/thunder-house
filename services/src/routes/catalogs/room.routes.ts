
import { Router } from "express";
import { check, param } from "express-validator";

import {
  roomGetAll,
  roomDelete,
  roomPost,
  roomPut,
  roomGet,
  roomDeletePhysical,
} from "../../controllers/catalogs/room.controllers";
import {
  validateFields,
  validateJWT,
} from "../../middlewares";
import {
  floorExistsById,
  roomExistsById,
  roomStatusExistsById,
  roomTypeExistsById,
} from "../../helpers/db-validators";
import { validateRoles } from "../../middlewares/validate-roles";


const router = Router();

// GET route for fetching room data
router.get("/", [
    validateJWT,
    validateRoles,
    validateFields,
  ],
  roomGetAll,
);

router.get("/:id_cat_room", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_room", "field (id_cat_room) can not be empty").not().isEmpty(),
    param("id_cat_room", "field (id_cat_room) should be integer").isInt({ min: 1 }),
    param("id_cat_room").custom(roomExistsById()),
    validateFields,
  ],
  roomGet,
);

// PUT route for updating a room's data by ID
router.put("/:id_cat_room", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_room", "field (id_cat_room) can not be empty").not().isEmpty(),
    param("id_cat_room", "field (id_cat_room) should be integer").isInt({ min: 1 }),
    param("id_cat_room").custom(roomExistsById(false)),
    check("number", "field (number) is required").not().isEmpty(),
    check("number", "field (number) should be integer").isInt({ min: 1 }),
    check("number", "field (number) should be greater than 0").isInt({ min: 1 }),
    check("name", "field (name) is required").optional(),
    check("name").default(null),
    check("status", "field (status) is required").not().isEmpty(),
    check("status", "field (status) should be boolean").isBoolean(),
    check("fk_cat_floor", "field (fk_cat_floor) can not be empty").not().isEmpty(),
    check("fk_cat_floor", "field (fk_cat_floor) should be integer").isInt({ min: 1 }),
    check("fk_cat_floor").custom(floorExistsById()),
    check("fk_cat_room_status", "field (fk_cat_room_status) can not be empty").not().isEmpty(),
    check("fk_cat_room_status", "field (fk_cat_room_status) should be integer").isInt({ min: 1 }),
    check("fk_cat_room_status").custom(roomStatusExistsById()),
    check("fk_cat_room_type", "field (fk_cat_room_type) can not be empty").not().isEmpty(),
    check("fk_cat_room_type", "field (fk_cat_room_type) should be integer").isInt({ min: 1 }),
    check("fk_cat_room_type").custom(roomTypeExistsById()),
    validateFields,
  ],
  roomPut,
);

// POST route for creating a new room
router.post("/", [
    validateJWT,
    validateRoles,
    validateFields,
    check("number", "field (number) is required").not().isEmpty(),
    check("number", "field (number) should be integer").isInt({ min: 1 }),
    check("name", "field (name) is required").optional(),
    check("name").default(null),
    check("fk_cat_floor", "field (fk_cat_floor) can not be empty").not().isEmpty(),
    check("fk_cat_floor", "field (fk_cat_floor) should be integer").isInt({ min: 1 }),
    check("fk_cat_floor").custom(floorExistsById()),
    check("fk_cat_room_status", "field (fk_cat_room_status) can not be empty").not().isEmpty(),
    check("fk_cat_room_status", "field (fk_cat_room_status) should be integer").isInt({ min: 1 }),
    check("fk_cat_room_status").custom(roomStatusExistsById()),
    check("fk_cat_room_type", "field (fk_cat_room_type) can not be empty").not().isEmpty(),
    check("fk_cat_room_type", "field (fk_cat_room_type) should be integer").isInt({ min: 1 }),
    check("fk_cat_room_type").custom(roomTypeExistsById()),
    validateFields,
  ],
  roomPost,
);

// DELETE route for deleting a room by ID
router.delete("/:id_cat_room", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_room", "field (id_cat_room) can not be empty").not().isEmpty(),
    param("id_cat_room", "field (id_cat_room) should be integer").isInt({ min: 1 }),
    param("id_cat_room").custom(roomExistsById()),
    validateFields,
  ],
  roomDelete,
);

// DELETE route for deleting a room by ID
router.delete("/physical/:id_cat_room", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_room", "field (id_cat_room) can not be empty").not().isEmpty(),
    param("id_cat_room", "field (id_cat_room) should be integer").isInt({ min: 1 }),
    param("id_cat_room").custom(roomExistsById()),
    validateFields,
  ],
  roomDeletePhysical,
);

export default router;
