
import { Router } from "express";
import { check, param } from "express-validator";

import {
  floorGetAll,
  floorDelete,
  floorPost,
  floorPut,
  floorGet,
  floorDeletePhysical,
} from "../../controllers/catalogs/floor.controllers";
import {
  validateFields,
  validateJWT,
} from "../../middlewares";
import {
  floorExistsById,
} from "../../helpers/db-validators";
import { validateRoles } from "../../middlewares/validate-roles";


const router = Router();

// GET route for fetching floor data
router.get("/", [
    validateJWT,
    validateRoles,
    validateFields,
  ],
  floorGetAll,
);

router.get("/:id_cat_floor", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_floor", "field (id_cat_floor) can not be empty").not().isEmpty(),
    param("id_cat_floor", "field (id_cat_floor) should be integer").isInt({ min: 1 }),
    param("id_cat_floor").custom(floorExistsById()),
    validateFields,
  ],
  floorGet,
);

// PUT route for updating a floor's data by ID
router.put("/:id_cat_floor", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_floor", "field (id_cat_floor) can not be empty").not().isEmpty(),
    param("id_cat_floor", "field (id_cat_floor) should be integer").isInt({ min: 1 }),
    param("id_cat_floor").custom(floorExistsById(false)),
    check("number", "field (number) is required").not().isEmpty(),
    check("number", "field (number) should be integer").isInt({ min: 1 }),
    check("number", "field (number) should be greater than 0").isInt({ min: 1}),
    check("name", "field (name) is required").optional(),
    check("name").default(null),
    check("status", "field (status) is required").not().isEmpty(),
    check("status", "field (status) should be boolean").isBoolean(),
    validateFields,
  ],
  floorPut,
);

// POST route for creating a new floor
router.post("/", [
    validateJWT,
    validateRoles,
    validateFields,
    check("number", "field (number) is required").not().isEmpty(),
    check("number", "field (number) should be integer").isInt({ min: 1 }),
    check("name", "field (name) is required").optional(),
    check("name").default(null),
    validateFields,
  ],
  floorPost,
);

// DELETE route for deleting a floor by ID
router.delete("/:id_cat_floor", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_floor", "field (id_cat_floor) can not be empty").not().isEmpty(),
    param("id_cat_floor", "field (id_cat_floor) should be integer").isInt({ min: 1 }),
    param("id_cat_floor").custom(floorExistsById()),
    validateFields,
  ],
  floorDelete,
);

router.delete("/physical/:id_cat_floor", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_floor", "field (id_cat_floor) can not be empty").not().isEmpty(),
    param("id_cat_floor", "field (id_cat_floor) should be integer").isInt({ min: 1 }),
    param("id_cat_floor").custom(floorExistsById()),
    validateFields,
  ],
  floorDeletePhysical,
);


export default router;
