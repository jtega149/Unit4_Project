import { pool } from "./database.js";
import exterior_colors from "../data/exterior.js";
import roofs from "../data/roofs.js";
import interiors from "../data/interiors.js";
import wheels from "../data/wheels.js";

const createCarsTable = async () => {
    try {
        // If table exists dont create it again
        const query = `
            DROP TABLE IF EXISTS cars;
            CREATE TABLE cars (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                exterior VARCHAR(255) NOT NULL,
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

const createExteriorsTable = async () => {
    try {
        const query = `
            DROP TABLE IF EXISTS exteriors;
            CREATE TABLE exteriors (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL
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
                image VARCHAR(255) NOT NULL,
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
                image VARCHAR(255) NOT NULL,
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
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL
            );
        `;
        await pool.query(query);
    } catch (error) { 
        console.error("Error creating tables:", error);
    }
}

const seedTables = async () => {
    try {
        await createCarsTable();
        await createExteriorsTable();
        exterior_colors.forEach(async (color) => {
            await pool.query(
                'INSERT INTO exteriors (name, image, price) VALUES ($1, $2, $3)',
                [color.name, color.image, color.price]
            );
            console.log(`Seeded ${color.name} into exteriors table`);
        });
        await createRoofsTable();
        roofs.forEach(async (roof) => {
            await pool.query(
                'INSERT INTO roofs (name, image, price, isConvertible) VALUES ($1, $2, $3, $4)',
                [roof.name, roof.image, roof.price, roof.isConvertible]
            );
            console.log(`Seeded ${roof.name} into roofs table`);
        });
        await createWheelsTable();
        wheels.forEach(async (wheel) => {
            await pool.query(
                'INSERT INTO wheels (name, image, price) VALUES ($1, $2, $3)',
                [wheel.name, wheel.image, wheel.price]
            );
            console.log(`Seeded ${wheel.name} into wheels table`);
        });
        await createInteriorsTable();
        interiors.forEach(async (interior) => {
            await pool.query(
                'INSERT INTO interiors (name, image, price) VALUES ($1, $2, $3)',
                [interior.name, interior.image, interior.price]
            );
            console.log(`Seeded ${interior.name} into interiors table`);
        });
    } catch (error) {
        console.error("Error seeding tables:", error);
    }
}

await seedTables();