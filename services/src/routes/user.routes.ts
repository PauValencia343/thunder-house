
import { Router } from "express";
import { check } from "express-validator";

import {
  userGetAll,
  userDelete,
  userPost,
  userPut,
  userGet,
} from "../controllers/user.controllers";
import {
  validateFields,
  validateJWT,
} from "../middlewares";
import {
  isUniqueUser,
  rolesExist,
  userExistsById,
} from "../helpers/db-validators";
import { validateRoles } from "../middlewares/validate-roles";


const router = Router();

// GET route for fetching user data
router.get("/", [
    validateJWT,
    validateRoles,
    validateFields,
  ], userGetAll
);

router.get("/:uuid", [
    validateJWT,
    validateRoles,
    validateFields,
  ], userGet
);

// PUT route for updating a user's data by ID
router.put("/:uuid", [
    validateJWT,
    validateRoles,
    validateFields,
    check("uuid", "Invalid UUID").isUUID(),
    check("uuid").custom(userExistsById),
    check("email").optional(),
    check("email").isEmail(),
    check("email").default(null),
    check('email').custom(isUniqueUser('email', true)),
    check("user_name").optional(),
    check("user_name").default(null),
    check('user_name').custom(isUniqueUser('user_name', true)),
    check("password").optional(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
    check("password").default(null),
    check("status", "field (status) should be boolean").isBoolean().optional(),
    check("status").default(null),
    check("roles").optional(),
    check("roles").default(null),
    check('roles').custom(rolesExist(true)),
    validateFields,
  ],
  userPut
);

// POST route for creating a new user
router.post("/", [
    validateJWT,
    validateRoles,
    validateFields,
    check("email", "email is required").not().isEmpty(),
    check("email").isEmail(),
    check('email').custom(isUniqueUser('email')),
    check("user_name", "user_name is required").not().isEmpty(),
    check('user_name').custom(isUniqueUser('user_name')),
    check("password", "Password is required").not().isEmpty(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
    check("roles", "field (roles) is required").not().isEmpty(),
    check("roles",).custom(rolesExist),
    validateFields,
  ],
  userPost
);

// DELETE route for deleting a user by ID
router.delete("/:uuid", [
    validateJWT,
    validateRoles,
    validateFields,
    check("uuid", "Invalid UUID").isUUID(),
    check("uuid").custom(userExistsById),
    validateFields,
  ],
  userDelete
);

export default router;
