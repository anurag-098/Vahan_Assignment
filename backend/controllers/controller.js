import pool from "../db.js";
import { validationResult } from "express-validator";

export const addEntity = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, mobileNumber, dateOfBirth } = req.body;
  try {
    const newEntity=await pool.query(
      "INSERT INTO person (name, email, mobileNumber, dateOfBirth) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, email, mobileNumber, dateOfBirth]
    );
    res.json(newEntity.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export const getAllEntities = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM person");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export const getAnEntity = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query("SELECT * FROM person WHERE id=$1", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).send('Entity not found');
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export const updateEntity = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, mobileNumber, dateOfBirth } = req.body;
  const id = req.params.id;
  try {
    await pool.query(
      "UPDATE person SET name=$1, email=$2, mobileNumber=$3, dateOfBirth=$4 WHERE id=$5",
      [name, email, mobileNumber, dateOfBirth, id]
    );
    res.send("Data updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

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
