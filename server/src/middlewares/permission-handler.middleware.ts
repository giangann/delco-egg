import express from 'express';
import httpStatusCodes from 'http-status-codes';

// Interfaces
import IRequest from '../interfaces/IRequest';

// Utilities
import ApiResponse from '../utilities/api-response.utility';

export const isAdmin = () => {
  return async (
    req: IRequest,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (!req.originalUrl.includes('login')) {
      if (!req.user.isAdmin) {
        return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
      }
    }
    next();
  };
};
