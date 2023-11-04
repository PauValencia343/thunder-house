
import { Router } from "express";
import { check, param, query } from "express-validator";

import {
  roomStatusGetAll,
  roomStatusDelete,
  roomStatusPost,
  roomStatusPut,
  roomStatusGet,
  roomStatusDeletePhysical,
} from "../../controllers/catalogs/room-status.controllers";
import {
  validateFields,
  validateJWT,
} from "../../middlewares";
import {
  roomStatusExistsById,
} from "../../helpers/db-validators";
import { validateRoles } from "../../middlewares/validate-roles";


const router = Router();

// GET route for fetching roomStatus data
router.get("/", [
    validateJWT,
    validateRoles,
    query("limit", "field (limit) should be integer and greater than 0").isInt({ min: 1 }).optional().default(null),
    query("page", "field (page) should be integer and greater than 0").isInt({ min: 1 }).optional().default(null),
    query("pagination", "field (pagination) should be boolean").isBoolean().optional().default(false),
    validateFields,
  ],
  roomStatusGetAll,
);

router.get("/:id_cat_room_status", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_room_status", "field (id_cat_room_status) can not be empty").not().isEmpty(),
    param("id_cat_room_status", "field (id_cat_room_status) should be integer and greater than 0").isInt({ min: 1 }),
    param("id_cat_room_status").custom(roomStatusExistsById()),
    validateFields,
  ],
  roomStatusGet,
);

// PUT route for updating a roomStatus's data by ID
router.put("/:id_cat_room_status", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_room_status", "field (id_cat_room_status) can not be empty").not().isEmpty(),
    param("id_cat_room_status", "field (id_cat_room_status) should be integer and greater than 0").isInt({ min: 1 }),
    param("id_cat_room_status").custom(roomStatusExistsById(false)),
    check("dirty", "field (dirty) is required").not().isEmpty(),
    check("dirty", "field (dirty) should be boolean").isBoolean(),
    check("busy", "field (busy) is required").not().isEmpty(),
    check("busy", "field (busy) should be boolean").isBoolean(),
    check("status", "field (status) is required").not().isEmpty(),
    check("status", "field (status) should be boolean").isBoolean(),
    validateFields,
  ],
  roomStatusPut,
);

// POST route for creating a new roomStatus
router.post("/", [
    validateJWT,
    validateRoles,
    validateFields,
    check("dirty", "field (dirty) is required").not().isEmpty(),
    check("dirty", "field (dirty) should be boolean").isBoolean(),
    check("busy", "field (busy) is required").not().isEmpty(),
    check("busy", "field (busy) should be boolean").isBoolean(),
    validateFields,
  ],
  roomStatusPost,
);

// DELETE route for deleting a roomStatus by ID
router.delete("/:id_cat_room_status", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_room_status", "field (id_cat_room_status) can not be empty").not().isEmpty(),
    param("id_cat_room_status", "field (id_cat_room_status) should be integer and greater than 0").isInt({ min: 1 }),
    param("id_cat_room_status").custom(roomStatusExistsById()),
    validateFields,
  ],
  roomStatusDelete,
);

// DELETE route for deleting a roomStatus by ID
router.delete("/physical/:id_cat_room_status", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_room_status", "field (id_cat_room_status) can not be empty").not().isEmpty(),
    param("id_cat_room_status", "field (id_cat_room_status) should be integer and greater than 0").isInt({ min: 1 }),
    param("id_cat_room_status").custom(roomStatusExistsById()),
    validateFields,
  ],
  roomStatusDeletePhysical,
);

export default router;
