import express from 'express';
const schemaValidator = require('express-joi-validator');

// Controller
import userController from '../../controllers/admin/user.controller';

// Middleware
const router = express.Router();

router.get('/', userController.list);
router.delete('/:id', userController.remove);
router.put('/:id', userController.update);
router.post('/create', userController.create);

export default router;
