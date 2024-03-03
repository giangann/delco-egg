import express from 'express';
import orderController from '../../controllers/admin/order.controller';

const orderRouter = express.Router();

orderRouter.get('/', orderController.list);
orderRouter.get('/:id', orderController.detail);
orderRouter.post('/', orderController.create);
orderRouter.put('/:id', orderController.update);
orderRouter.put('/:id/update-status', orderController.updateStatus);
orderRouter.get(
  '/statistic/by-status',
  orderController.orderStatisticByStatus,
);

export default orderRouter;
