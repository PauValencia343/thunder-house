
import { Router } from "express";
import { check, param } from "express-validator";

import {
  userGetAll,
  userDelete,
  userPost,
  userPut,
  userGet,
  userDeletePhysical,
} from "../../controllers/catalogs/user.controllers";
import {
  validateFields,
  validateJWT,
} from "../../middlewares";
import {
  isUniqueUser,
  isValidArrayRoles,
  rolesExist,
  userExistsById,
} from "../../helpers/db-validators";
import { validateRoles } from "../../middlewares/validate-roles";


const router = Router();

// GET route for fetching user data
router.get("/", [
    validateJWT,
    validateRoles,
    validateFields,
  ],
  userGetAll,
);

router.get("/:id_cat_user", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_user", "field (id_cat_user) can not be empty").not().isEmpty(),
    param("id_cat_user", "field (id_cat_user) should be integer").isInt({ min: 1 }),
    param("id_cat_user").custom(userExistsById()),
    validateFields,
  ],
  userGet,
);

// PUT route for updating a user's data by ID
router.put("/:id_cat_user", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_user", "field (id_cat_user) can not be empty").not().isEmpty(),
    param("id_cat_user", "field (id_cat_user) should be integer").isInt({ min: 1 }),
    param("id_cat_user").custom(userExistsById(false)),
    check("email", "field (email) is required").not().isEmpty(),
    check("email").isEmail(),
    // check('email').custom(isUniqueUser('email', true)),
    check("user_name", "field (user_name) is required").not().isEmpty(),
    // check('user_name').custom(isUniqueUser('user_name', true)),
    check("password", "field (password) is required").not().isEmpty(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
    check("password").default(null),
    check("status", "field (status) is required").not().isEmpty(),
    check("status", "field (status) should be boolean").isBoolean(),
    check("roles", "field (roles) is required").not().isEmpty(),
    check("roles", "field (roles) should be array").isArray(),
    check("roles").custom(isValidArrayRoles),
    validateFields,
  ],
  userPut,
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
    check("roles", "field (roles) should be array").isArray(),
    check("roles").custom(isValidArrayRoles),
    validateFields,
  ],
  userPost,
);

// DELETE route for deleting a user by ID
router.delete("/:id_cat_user", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_user", "field (id_cat_user) can not be empty").not().isEmpty(),
    param("id_cat_user", "field (id_cat_user) should be integer").isInt({ min: 1 }),
    param("id_cat_user").custom(userExistsById()),
    validateFields,
  ],
  userDelete,
);

// DELETE route for deleting a user by ID
router.delete("/physical/:id_cat_user", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_user", "field (id_cat_user) can not be empty").not().isEmpty(),
    param("id_cat_user", "field (id_cat_user) should be integer").isInt({ min: 1 }),
    param("id_cat_user").custom(userExistsById()),
    validateFields,
  ],
  userDeletePhysical,
);

export default router;
