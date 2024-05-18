import pool from "../db.js";
import { validationResult } from "express-validator";


//controller for adding an entity to database
export const addEntity = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, mobilenumber, dateofbirth } = req.body;
  try {
    const newEntity=await pool.query(
      "INSERT INTO person (name, email, mobilenumber, dateofbirth) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, email, mobilenumber, dateofbirth]
    );
    res.json(newEntity.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};


//controller for getting all the entities from database
export const getAllEntities = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM person");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

//controller for editing an entity's data in database
export const updateEntity = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, mobilenumber, dateofbirth } = req.body;
  const id = req.params.id;
  try {
    await pool.query(
      "UPDATE person SET name=$1, email=$2, mobilenumber=$3, dateofbirth=$4 WHERE id=$5",
      [name, email, mobilenumber, dateofbirth, id]
    );
    res.send("Data updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};


//controller for deleting an entity from database
export const deleteEntity = async (req, res) => {
  const id = req.params.id;
  
  try {
    const result = await pool.query('DELETE FROM person WHERE id=$1', [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).send('Entity not found');
    }
    
    res.send('Deleted Successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
