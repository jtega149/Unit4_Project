import { pool } from '../config/database.js';

const getCars = async (req, res) => {
    try {
        const query = 'SELECT * FROM cars';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const createCar = async (req, res) => {
    try {

    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const updateCar = async (req, res) => {
    try {

    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const deleteCar = async (req, res) => {
    try {
        const { id } = req.params.id;
        const query = 'DELETE FROM cars WHERE id = $1';
        await pool.query(query, [id]);
        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

export default {
    getCars,
    createCar,
    updateCar,
    deleteCar
}