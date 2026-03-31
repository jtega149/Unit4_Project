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
        const { name, exterior, roof, interior, wheels, price, isConvertible } = req.body;
        const query = 'INSERT INTO cars (name, exterior, roof, interior, wheels, price, isConvertible) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        await pool.query(query, [name, exterior, roof, interior, wheels, price, isConvertible]);
        res.json({ message: 'Car created successfully' });
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const updateCar = async (req, res) => {
    try {
        const { id } = req.params.id;
        const {name, exterior, roof, interior, wheels, price, isConvertible } = req.body;
        const query = 'UPDATE cars SET name = $1, exterior = $2, roof = $3, interior = $4, wheels = $5, price = $6, isConvertible = $7 WHERE id = $8';
        await pool.query(query, [name, exterior, roof, interior, wheels, price, isConvertible, id]);
        res.json({ message: 'Car updated successfully' });
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

const deleteCar = async (req, res) => {
    try {
        const { id } = req.params.id
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