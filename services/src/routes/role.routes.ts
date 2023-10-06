
import { Router } from "express";
import { check } from "express-validator";
import {
  roleGet,
  roleDelete,
  rolePost,
  rolePut,
} from "../controllers/role.controllers";
import {
  validateFields,
  validateJWT,
  isAdminRole,
  hasRole,
} from "../middlewares";
import {
  emailExists,
  // roleExistsById,
} from "../helpers/db-validators";

const router = Router();

// GET route for fetching role data
router.get("/", roleGet);

// PUT route for updating a role's data by ID
router.put("/:uuid", [
    validateJWT,
    check("uuid", "Invalid UUID").isUUID(),
    check("role", "field (role) is required").not().isEmpty(),
    validateFields,
  ],
  rolePut
);

// POST route for creating a new role
router.post("/", [
    validateJWT,
    check("role", "field (role) is required").not().isEmpty(),
    validateFields,
  ],
  rolePost
);

// DELETE route for deleting a role by ID
router.delete("/:uuid", [
    validateJWT,
    // hasRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("uuid", "Invalid UUID").isUUID(),
    validateFields,
  ],
  roleDelete
);

export default router;
