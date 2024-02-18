import * as express from 'express';
import orderRouter from './order.route';
import meRouter from './me.route';
import eggPriceQtyRouter from './egg-price-qty.route';
import authRouter from './auth.route';
import orderNotiRouter from './order-noti.route';

const router = express.Router();
router.use('/order', orderRouter);
router.use('/me', meRouter);
router.use('/egg-price-qty', eggPriceQtyRouter);
router.use('/auth', authRouter);
router.use('/noti', orderNotiRouter);

export default router;
