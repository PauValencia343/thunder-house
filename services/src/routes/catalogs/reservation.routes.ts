
import { Router } from "express";
import { check, param, query } from "express-validator";

import {
  reservationGetAll,
  reservationDelete,
  reservationPost,
  reservationPut,
  reservationGet,
} from "../../controllers/catalogs/reservation.controllers";
import {
  validateFields,
  validateJWT,
} from "../../middlewares";
import {
  reservationExistsById,
} from "../../helpers/db-validators";
import { validateRoles } from "../../middlewares/validate-roles";


const router = Router();

// GET route for fetching reservation data
router.get("/", [
    validateJWT,
    validateRoles,
    query("limit", "field (limit) should be integer and greater than 0").isInt({ min: 1 }).optional().default(null),
    query("page", "field (page) should be integer and greater than 0").isInt({ min: 1 }).optional().default(null),
    query("pagination", "field (pagination) should be boolean").isBoolean().optional().default(false),
    validateFields,
  ],
  reservationGetAll,
);

router.get("/:id_cat_reservation", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_reservation", "field (id_cat_reservation) can not be empty").not().isEmpty(),
    param("id_cat_reservation", "field (id_cat_reservation) should be integer and greater than 0").isInt({ min: 1 }),
    param("id_cat_reservation").custom(reservationExistsById()),
    validateFields,
  ],
  reservationGet,
);

// PUT route for updating a reservation's data by ID
router.put("/:id_cat_reservation", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_reservation", "field (id_cat_reservation) can not be empty").not().isEmpty(),
    param("id_cat_reservation", "field (id_cat_reservation) should be integer and greater than 0").isInt({ min: 1 }),
    param("id_cat_reservation").custom(reservationExistsById(false)),
    check("group_leader", "field (group_leader) is required").not().isEmpty(),
    check("sub_group_leader", "field (sub_group_leader) is required").not().isEmpty(),
    check("fk_cat_client", "field (fk_cat_client) is required").not().isEmpty(),
    check("fk_cat_client", "field (fk_cat_client) should be integer and greater than 0").isInt({ min: 1 }),
    check("status", "field (status) is required").not().isEmpty(),
    check("status", "field (status) should be boolean").isBoolean(),
    validateFields,
  ],
  reservationPut,
);

// POST route for creating a new reservation
router.post("/", [
    validateJWT,
    validateRoles,
    validateFields,
    check("group_leader", "field (group_leader) is required").not().isEmpty(),
    check("sub_group_leader", "field (sub_group_leader) is required").not().isEmpty(),
    check("fk_cat_client", "field (fk_cat_client) is required").not().isEmpty(),
    check("fk_cat_client", "field (fk_cat_client) should be integer and greater than 0").isInt({ min: 1 }),
    validateFields,
  ],
  reservationPost,
);

// DELETE route for deleting a reservation by ID
router.delete("/:id_cat_reservation", [
    validateJWT,
    validateRoles,
    validateFields,
    param("id_cat_reservation", "field (id_cat_reservation) can not be empty").not().isEmpty(),
    param("id_cat_reservation", "field (id_cat_reservation) should be integer and greater than 0").isInt({ min: 1 }),
    param("id_cat_reservation").custom(reservationExistsById()),
    validateFields,
  ],
  reservationDelete,
);

export default router;
