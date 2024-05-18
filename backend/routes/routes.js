import express from "express";
import { check } from "express-validator";
import {
  getAllEntities,
  addEntity,
  updateEntity,
  deleteEntity,
} from "../controllers/controller.js";
const router = express.Router();


//ROUTES//

//create an entity
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("mobilenumber", "Please include a valid mobile number").isLength({
      min: 10,
    }),
    check("dateofbirth", "Date of birth is required").isISO8601().toDate(),
  ],
  addEntity
);

//get all entities
router.get("/", getAllEntities);


//update an entity
router.put(
  "/:id",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("mobilenumber", "Please include a valid mobile number").isLength({
      min: 10,
    }),
    check("dateofbirth", "Date of birth is required").isISO8601().toDate(),
  ],
  updateEntity
);

//delete an entity
router.delete("/:id", deleteEntity);

export default router;
