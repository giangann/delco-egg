import express from 'express';
const schemaValidator = require('express-joi-validator');

// Controller
import userController from '../../controllers/admin/user.controller';

// Schema
import userSchema from '../../validations/schemas/user.schema';

const router = express.Router();

router.get('/', userController.me);

router.put(
  '/',
  schemaValidator(userSchema.updateMe),
  userController.updateMe,
);
router.put('/change-password',userController.changePassword)

export default router;
