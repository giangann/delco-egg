import express from 'express';
const schemaValidator = require('express-joi-validator');

// Controller
import userController from '../../controllers/admin/user.controller';

// Middleware
const router = express.Router();

router.get('/', userController.list);
router.get('/:id', userController.detail);
router.delete('/:id', userController.remove);
router.put('/:id', userController.update);
router.post('/create', userController.create);
router.put(
  '/reset-password/:userId',
  userController.resetPasswordDefault,
);
router.get(
  '/client-order-overview/:userId',
  userController.clientOrderOverview,
);
router.get(
  '/client-order-egg-statistic/:userId',
  userController.clientOrderEggStatistic,
);

export default router;
