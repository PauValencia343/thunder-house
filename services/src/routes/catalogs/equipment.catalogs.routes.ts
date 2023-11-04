
import { Router } from "express";
import { check, param, query } from "express-validator";

import {
  equipmentGetAll,
  equipmentDelete,
  equipmentPost,
  equipmentPut,
  equipmentGet,
  equipmentDeletePhysical,
} from "../../controllers/catalogs/equipment.controllers";
import {
  validateFields,
  validateJWT,
} from "../../middlewares";
import {
  equipmentExistsById,
} from "../../helpers/db-validators";
import { validateRoles } from "../../middlewares/validate-roles";


const router = Router();

// GET route for fetching equipment data
router.get("/", [
    validateJWT,
    validateRoles,
    query("limit", "field (limit) should be integer and greater than 0").isInt({ min: 1 }).optional().default(null),
    query("page", "field (page) should be integer and greater than 0").isInt({ min: 1 }).optional().default(null),
    query("pagination", "field (pagination) should be boolean").isBoolean().optional().default(false),
    validateFields,
  ],
  equipmentGetAll,
);

router.get("/:id_cat_equipment", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_equipment", "field (id_cat_equipment) can not be empty").not().isEmpty(),
    param("id_cat_equipment", "field (id_cat_equipment) should be integer and greater than 0").isInt({ min: 1 }),
    param("id_cat_equipment").custom(equipmentExistsById()),
    validateFields,
  ],
  equipmentGet,
);

// PUT route for updating a equipment's data by ID
router.put("/:id_cat_equipment", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_equipment", "field (id_cat_equipment) can not be empty").not().isEmpty(),
    param("id_cat_equipment", "field (id_cat_equipment) should be integer and greater than 0").isInt({ min: 1 }),
    param("id_cat_equipment").custom(equipmentExistsById(false)),
    check("equipment", "field (equipment) is required").not().isEmpty(),
    check("status", "field (status) is required").not().isEmpty(),
    check("status", "field (status) should be boolean").isBoolean(),
    validateFields,
  ],
  equipmentPut,
);

// POST route for creating a new equipment
router.post("/", [
    validateJWT,
    validateRoles,
    validateFields,
    check("equipment", "field (equipment) is required").not().isEmpty(),
    check("total_number_people", "field (total_number_people) is required").not().isEmpty(),
    check("total_number_people", "field (total_number_people) should be integer and greater than 0").isInt({ min: 1 }),
    validateFields,
  ],
  equipmentPost,
);

// DELETE route for deleting a equipment by ID
router.delete("/:id_cat_equipment", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_equipment", "field (id_cat_equipment) can not be empty").not().isEmpty(),
    param("id_cat_equipment", "field (id_cat_equipment) should be integer and greater than 0").isInt({ min: 1 }),
    param("id_cat_equipment").custom(equipmentExistsById()),
    validateFields,
  ],
  equipmentDelete,
);

// DELETE route for deleting a equipment by ID
router.delete("/physical/:id_cat_equipment", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_equipment", "field (id_cat_equipment) can not be empty").not().isEmpty(),
    param("id_cat_equipment", "field (id_cat_equipment) should be integer and greater than 0").isInt({ min: 1 }),
    param("id_cat_equipment").custom(equipmentExistsById()),
    validateFields,
  ],
  equipmentDeletePhysical,
);

export default router;
