import express from 'express';
import eggPriceQtyController from '../../controllers/egg-price-qty/egg-price-qty.controller';
import { isAdmin } from '../../middlewares/permission-handler.middleware';
const eggPriceQtyRoute = express.Router();

eggPriceQtyRoute.get('/', eggPriceQtyController.list);
eggPriceQtyRoute.put('/:id', isAdmin(), eggPriceQtyController.update);
eggPriceQtyRoute.post(
  '/update-day-price',
  isAdmin(),
  eggPriceQtyController.updateDayPrice,
);

eggPriceQtyRoute.post(
  '/update-day-quantity',
  isAdmin(),
  eggPriceQtyController.updateDayQuantity,
);

export default eggPriceQtyRoute;
