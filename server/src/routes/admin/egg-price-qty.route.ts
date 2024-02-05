import express from 'express';
import eggPriceQtyController from '../../controllers/admin/egg-price-qty.controller';
const eggPriceQtyRoute = express.Router();

eggPriceQtyRoute.get('/', eggPriceQtyController.list);
eggPriceQtyRoute.put('/:id', eggPriceQtyController.update);
eggPriceQtyRoute.post(
  '/update-day-price',
  eggPriceQtyController.updateDayPrice,
);

eggPriceQtyRoute.post(
  '/update-day-quantity',
  eggPriceQtyController.updateDayQuantity,
);

export default eggPriceQtyRoute;
