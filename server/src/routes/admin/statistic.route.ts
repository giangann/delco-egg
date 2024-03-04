import express from 'express';
import statisticController from '../../controllers/admin/statistic.controller';

const statisticRouter = express.Router();

statisticRouter.get(
  '/overview-by-date',
  statisticController.todayOverview,
);

export default statisticRouter;
