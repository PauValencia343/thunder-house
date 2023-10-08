
import { Router } from "express";
import { check } from "express-validator";

import {
  roleGetAll,
  roleDelete,
  rolePost,
  rolePut,
  roleGet,
} from "../controllers/role.controllers";
import {
  validateFields,
  validateJWT,
} from "../middlewares";
import {
  roleExistsById,
} from "../helpers/db-validators";
import { validateRoles } from "../middlewares/validate-roles";


const router = Router();

// GET route for fetching role data
router.get("/", roleGetAll);

router.get("/:uuid", roleGet);

// PUT route for updating a role's data by ID
router.put("/:uuid", [
    validateJWT,
    validateRoles,
    validateFields,
    check("uuid", "Invalid UUID").isUUID(),
    check("uuid").custom(roleExistsById),
    check("role", "field (role) is required").not().isEmpty(),
    check("status", "field (status) should be boolean").isBoolean().optional(),
    check("status").default(null),
    validateFields,
  ],
  rolePut
);

// POST route for creating a new role
router.post("/", [
    validateJWT,
    validateRoles,
    validateFields,
    check("role", "field (role) is required").not().isEmpty(),
    validateFields,
  ],
  rolePost
);

// DELETE route for deleting a role by ID
router.delete("/:uuid", [
    validateJWT,
    validateRoles,
    validateFields,
    check("uuid", "Invalid UUID").isUUID(),
    check("uuid").custom(roleExistsById),
    validateFields,
  ],
  roleDelete
);

export default router;
