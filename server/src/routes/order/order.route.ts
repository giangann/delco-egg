import express from 'express';
import orderController from '../../controllers/order/order.controller';

const orderRouter = express.Router();

orderRouter.get('/', orderController.list)
orderRouter.post('/', orderController.create);
orderRouter.put('/:id', orderController.update);
orderRouter.put('/:id/update-status', orderController.updateStatus);

export default orderRouter;
