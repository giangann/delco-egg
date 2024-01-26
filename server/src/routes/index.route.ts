import * as express from 'express';

import defaultRouter from './default/default.route';
import authRouter from './auth/auth.route';
import meRouter from './me/me.route';
import userRouter from './user/user.route';
import eggRouter from './egg/egg.route';
import eggPriceQtyRoute from './egg-price-qty/egg-price-qty.route';

const router = express.Router();

router.use('/', defaultRouter);
router.use('/auth', authRouter);
router.use('/me', meRouter);
router.use('/user', userRouter);
router.use('/egg', eggRouter);
router.use('/egg-price-qty', eggPriceQtyRoute);

export default router;
