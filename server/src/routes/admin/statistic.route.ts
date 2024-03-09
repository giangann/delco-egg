import express from 'express';
import statisticController from '../../controllers/admin/statistic.controller';

const statisticRouter = express.Router();

statisticRouter.get(
  '/overview-by-date',
  statisticController.todayOverview,
);

statisticRouter.get(
  '/egg-price-qty-history',
  statisticController.getEggPriceQtyHistory,
);
statisticRouter.get(
  '/egg-price-qty-by-date',
  statisticController.getEggPriceQtyByDate,
);

export default statisticRouter;
