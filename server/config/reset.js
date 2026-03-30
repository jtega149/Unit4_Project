import { pool } from "./client.js";

const createCarsTable = async () => {
    try {
        const query = `
            DROP TABLE IF EXISTS cars;
            CREATE TABLE cars (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                exteriror VARCHAR(255) NOT NULL,
                roof VARCHAR(255) NOT NULL,
                interior VARCHAR(255) NOT NULL,
                wheels VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                isConvertible BOOLEAN NOT NULL
            );
        `;
        await pool.query(query);
        console.log("Tables created successfully.");
    } catch (error) {
        console.error("Error creating tables:", error);
    }
}

const createColorsTable = async () => {
    try {
        const query = `
            DROP TABLE IF EXISTS colors;
            CREATE TABLE colors (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                hex_code VARCHAR(7) NOT NULL
            );
        `;
        await pool.query(query);
    } catch (error) {
        console.error("Error creating tables:", error);
    }
}

const createRoofsTable = async () => {
    try {
        const query = `
            DROP TABLE IF EXISTS roofs;
            CREATE TABLE roofs (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                isConvertible BOOLEAN NOT NULL
            );
        `;
        await pool.query(query);
    } catch (error) {
        console.error("Error creating tables:", error);
    }
}

const createWheelsTable = async () => {
    try {
        const query = `
            DROP TABLE IF EXISTS wheels;
            CREATE TABLE wheels (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL
            );
        `;
        await pool.query(query);
    } catch (error) {
        console.error("Error creating tables:", error);
    }
}

const createInteriorsTable = async () => {
    try {
        const query = `
            DROP TABLE IF EXISTS interiors;
            CREATE TABLE interiors (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL
            );
        `;
        await pool.query(query);
    } catch (error) { 
        console.error("Error creating tables:", error);
    }
}