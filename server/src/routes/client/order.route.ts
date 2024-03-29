import express from 'express';
import orderController from '../../controllers/client/order.controller';

const orderRouter = express.Router();

orderRouter.get('/', orderController.list);
orderRouter.get('/:id', orderController.detail);
orderRouter.post('/', orderController.create);
orderRouter.put('/:id', orderController.update);
orderRouter.put('/:id/update-status', orderController.updateStatus);

export default orderRouter;
