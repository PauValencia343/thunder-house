
import { Router } from "express";
import { check } from "express-validator";
import {
  userGet,
  userDelete,
  userPost,
  userPut,
} from "../controllers/user.controllers";
import {
  validateFields,
  validateJWT,
  isAdminRole,
  hasRole,
} from "../middlewares";
import {
  emailExists,
  userExistsById,
} from "../helpers/db-validators";

const router = Router();

// GET route for fetching user data
router.get("/", [
    validateJWT,
    validateFields,
  ], userGet
);

// PUT route for updating a user's data by ID
router.put("/:uuid", [
    validateJWT,
    check("uuid", "Invalid UUID").isUUID(),
    check("uuid").custom(userExistsById),
    check("password", "Password is required").not().isEmpty(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
    check("roles", "field (roles) is required").not().isEmpty(),
    validateFields,
  ],
  userPut
);

// POST route for creating a new user
router.post("/", [
    validateJWT,
    check("password", "Password is required").not().isEmpty(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
    check("email").custom(emailExists),
    check("roles", "field (roles) is required").not().isEmpty(),
    validateFields,
  ],
  userPost
);

// DELETE route for deleting a user by ID
router.delete("/:uuid", [
    validateJWT,
    check("uuid", "Invalid UUID").isUUID(),
    check("uuid").custom(userExistsById),
    validateFields,
  ],
  userDelete
);

export default router;
