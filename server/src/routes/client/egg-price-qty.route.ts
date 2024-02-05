import express from 'express';
import eggPriceQtyController from '../../controllers/client/egg-price-qty.controller';
const eggPriceQtyRoute = express.Router();

eggPriceQtyRoute.get('/', eggPriceQtyController.list);

export default eggPriceQtyRoute;
