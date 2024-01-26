import express from 'express';
import eggPriceQtyController from '../../controllers/egg-price-qty/egg-price-qty.controller';
const eggPriceQtyRoute = express.Router();

eggPriceQtyRoute.get('/', eggPriceQtyController.list);
eggPriceQtyRoute.put('/:id', eggPriceQtyController.update);

export default eggPriceQtyRoute;
