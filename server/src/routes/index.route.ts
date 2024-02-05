import * as express from 'express';

import adminRouter from './admin';
import clientRouter from './client';
import defaultRouter from './default/default.route';

import { isAdmin } from '../middlewares/permission-handler.middleware';

const router = express.Router();

router.use('/admin', isAdmin(), adminRouter);
router.use('/client', clientRouter);
router.use('/', defaultRouter);

export default router;
