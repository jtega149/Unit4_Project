import { pool } from '../config/database.js';

const getExteriors = async (req, res) => {
    try {
        const query = 'SELECT * FROM exteriors';
        console.log("Tried to get exteriors");
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const getRoofs = async (req, res) => {
    try {
        const query = 'SELECT * FROM roofs';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const getInteriors = async (req, res) => {
    try {
        const query = 'SELECT * FROM interiors';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const getWheels = async (req, res) => {
    try {
        const query = 'SELECT * FROM wheels';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

export default {
    getExteriors,
    getRoofs,
    getInteriors,
    getWheels,
}