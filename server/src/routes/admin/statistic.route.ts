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

export default statisticRouter;
