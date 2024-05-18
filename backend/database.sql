CREATE DATABASE People;

CREATE TABLE Person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobilenumber VARCHAR(20) NOT NULL,
    dateofbirth DATE NOT NULL
);