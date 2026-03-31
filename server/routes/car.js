import express from 'express';
import CarController from '../controllers/itemsController.js';
import PartsController from '../controllers/partsController.js';
const router = express.Router();

router.get('/cars', CarController.getCars);
router.post('/cars', CarController.createCar);
router.put('/cars/:id', CarController.updateCar);
router.delete('/cars/:id', CarController.deleteCar);

router.get('/exteriors', PartsController.getExteriors);
router.get('/roofs', PartsController.getRoofs);
router.get('/interiors', PartsController.getInteriors);
router.get('/wheels', PartsController.getWheels);
export default router;