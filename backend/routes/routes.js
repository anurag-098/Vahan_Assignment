import express from "express";
import { check } from "express-validator";
import {
  getAllEntities,
  getAnEntity,
  addEntity,
  updateEntity,
  deleteEntity,
} from "../controllers/controller.js";
const router = express.Router();

import pool from "../db.js";

//ROUTES//

//create an entity
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("mobileNumber", "Please include a valid mobile number").isLength({
      min: 10,
    }),
    check("dateOfBirth", "Date of birth is required").isISO8601().toDate(),
  ],
  addEntity
);

//get all entities
router.get("/", getAllEntities);

//get an entity
router.get("/:id", getAnEntity);

//update an entity
router.put(
  "/:id",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("mobileNumber", "Please include a valid mobile number").isLength({
      min: 10,
    }),
    check("dateOfBirth", "Date of birth is required").isISO8601().toDate(),
  ],
  updateEntity
);

//delete an entity
router.delete("/:id", deleteEntity);

export default router;
