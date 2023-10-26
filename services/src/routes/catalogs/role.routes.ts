
import { Router } from "express";
import { check, param } from "express-validator";

import {
  roleGetAll,
  roleDelete,
  rolePost,
  rolePut,
  roleGet,
  roleDeletePhysical,
} from "../../controllers/catalogs/role.controllers";
import {
  validateFields,
  validateJWT,
} from "../../middlewares";
import {
  isValidArrayFloors,
  roleExistsById,
} from "../../helpers/db-validators";
import { validateRoles } from "../../middlewares/validate-roles";


const router = Router();

// GET route for fetching role data
router.get("/", roleGetAll);

router.get("/:id_cat_role", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_role", "field (id_cat_role) can not be empty").not().isEmpty(),
    param("id_cat_role", "field (id_cat_role) should be integer").isInt({ min: 1 }),
    param("id_cat_role").custom(roleExistsById()),
    validateFields,
  ],
  roleGet,
);

// PUT route for updating a role's data by ID
router.put("/:id_cat_role", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_role", "field (id_cat_role) can not be empty").not().isEmpty(),
    param("id_cat_role", "field (id_cat_role) should be integer").isInt({ min: 1 }),
    param("id_cat_role").custom(roleExistsById(false)),
    check("role", "field (role) is required").not().isEmpty(),
    check("status", "field (status) is required").not().isEmpty(),
    check("status", "field (status) should be boolean").isBoolean(),
    check("floors", "field (floors) is required").not().isEmpty(),
    check("floors", "field (floors) should be array").isArray(),
    check("floors").custom(isValidArrayFloors),
    validateFields,
  ],
  rolePut,
);

// POST route for creating a new role
router.post("/", [
    validateJWT,
    validateRoles,
    validateFields,
    check("role", "field (role) is required").not().isEmpty(),
    check("floors", "field (floors) is required").not().isEmpty(),
    check("floors", "field (floors) should be array").isArray(),
    check("floors").custom(isValidArrayFloors),
    validateFields,
  ],
  rolePost,
);

// DELETE route for deleting a role by ID
router.delete("/:id_cat_role", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_role", "field (id_cat_role) can not be empty").not().isEmpty(),
    param("id_cat_role", "field (id_cat_role) should be integer").isInt({ min: 1 }),
    param("id_cat_role").custom(roleExistsById()),
    validateFields,
  ],
  roleDelete,
);

router.delete("/physical/:id_cat_role", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_role", "field (id_cat_role) can not be empty").not().isEmpty(),
    param("id_cat_role", "field (id_cat_role) should be integer").isInt({ min: 1 }),
    param("id_cat_role").custom(roleExistsById()),
    validateFields,
  ],
  roleDeletePhysical,
);

export default router;
