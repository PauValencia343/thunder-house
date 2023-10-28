
import { Router } from "express";
import { check, param } from "express-validator";

import {
  supplieGetAll,
  supplieDelete,
  suppliePost,
  suppliePut,
  supplieGet,
  supplieDeletePhysical,
} from "../../controllers/catalogs/supplie.controllers";
import {
  validateFields,
  validateJWT,
} from "../../middlewares";
import {
  supplieExistsById,
} from "../../helpers/db-validators";
import { validateRoles } from "../../middlewares/validate-roles";


const router = Router();

// GET route for fetching supplie data
router.get("/", [
    validateJWT,
    validateRoles,
    validateFields,
  ],
  supplieGetAll,
);

router.get("/:id_cat_supplie", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_supplie", "field (id_cat_supplie) can not be empty").not().isEmpty(),
    param("id_cat_supplie", "field (id_cat_supplie) should be integer").isInt(),
    param("id_cat_supplie").custom(supplieExistsById()),
    validateFields,
  ],
  supplieGet,
);

// PUT route for updating a supplie's data by ID
router.put("/:id_cat_supplie", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_supplie", "field (id_cat_supplie) can not be empty").not().isEmpty(),
    param("id_cat_supplie", "field (id_cat_supplie) should be integer").isInt(),
    param("id_cat_supplie").custom(supplieExistsById(false)),
    check("supplie", "field (supplie) is required").not().isEmpty(),
    check("status", "field (status) is required").not().isEmpty(),
    check("status", "field (status) should be boolean").isBoolean(),
    validateFields,
  ],
  suppliePut,
);

// POST route for creating a new supplie
router.post("/", [
    validateJWT,
    validateRoles,
    validateFields,
    check("supplie", "field (supplie) is required").not().isEmpty(),
    validateFields,
  ],
  suppliePost,
);

// DELETE route for deleting a supplie by ID
router.delete("/:id_cat_supplie", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_supplie", "field (id_cat_supplie) can not be empty").not().isEmpty(),
    param("id_cat_supplie", "field (id_cat_supplie) should be integer").isInt(),
    param("id_cat_supplie").custom(supplieExistsById()),
    validateFields,
  ],
  supplieDelete,
);

// DELETE route for deleting a supplie by ID
router.delete("/physical/:id_cat_supplie", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_supplie", "field (id_cat_supplie) can not be empty").not().isEmpty(),
    param("id_cat_supplie", "field (id_cat_supplie) should be integer").isInt(),
    param("id_cat_supplie").custom(supplieExistsById()),
    validateFields,
  ],
  supplieDeletePhysical,
);

export default router;
