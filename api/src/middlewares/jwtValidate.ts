import boom from '@hapi/boom';
import jwt, { Secret, GetPublicKeyOrSecret } from 'jsonwebtoken';
import { secretToken } from '../utils/functions/config';
import { Request, Response, NextFunction } from 'express';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers?.authorization?.split('Bearer ')[1];

  if (!bearerToken) {
    return next(boom.badRequest('No token provided'));
  }

  if (!secretToken) {
    return next(boom.internal('Secret token not configured'));
  }

  try {
    jwt.verify(bearerToken, secretToken as Secret | GetPublicKeyOrSecret);
    return next();
  } catch (e) {
    return next(boom.forbidden('Token invalid'));
  }
};
