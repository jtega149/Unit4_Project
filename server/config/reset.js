import { pool } from "./client.js";

const createTables = async () => {
    try {
        const query = `
            DROP TABLE IF EXISTS cars;
            CREATE TABLE cars (
                id SERIAL PRIMARY KEY,
                make VARCHAR(255) NOT NULL,
                model VARCHAR(255) NOT NULL,
                year INT NOT NULL,
                price DECIMAL(10, 2) NOT NULL
            );
        `;
        await pool.query(query);
        console.log("Tables created successfully.");
    } catch (error) {
        console.error("Error creating tables:", error);
    }
}