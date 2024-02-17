import express from 'express';
const schemaValidator = require('express-joi-validator');

// Controller
import userController from '../../controllers/admin/user.controller';

// Schema
import userSchema from '../../validations/schemas/user.schema';

const authRoute = express.Router();

authRoute.post(
  '/login',
  schemaValidator(userSchema.login),
  userController.login,
);
authRoute.get('/logout', userController.logout);

export default authRoute;
