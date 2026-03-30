import express from 'express';
import CarController from '../controllers/itemsController.js';

const router = express.Router();

router.get('/cars', CarController.getCars);
router.post('/cars', CarController.createCar);
router.put('/cars/:id', CarController.updateCar);
router.delete('/cars/:id', CarController.deleteCar);

export default router;