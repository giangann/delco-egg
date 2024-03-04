import * as express from 'express';
import eggPriceQtyRoute from './egg-price-qty.route';
import eggRouter from './egg.route';
import userRouter from './user.route';
import authRouter from './auth.route';
import meRouter from './me.route';
import orderRouter from './order.route';
import orderNotiRouter from './order-noti.route';
import statisticRouter from './statistic.route';

const router = express.Router();
router.use('/egg-price-qty', eggPriceQtyRoute);
router.use('/egg', eggRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/me', meRouter);
router.use('/order', orderRouter);
router.use('/noti', orderNotiRouter);
router.use('/statistic', statisticRouter)
export default router;
