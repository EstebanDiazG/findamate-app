import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';

import sendResponse from '../utils/functions/sendResponse';

import {
    upsertUserSchema,
    idUserSchema,
    rutUserSchema,
} from '../schemas/userSchema';

import User from '../models/User';

const getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const response = await User.getAll();
      sendResponse(req, res, response);
    } catch (err: any) {
      return next(boom.badImplementation(err));
    }
  };

  const getByRut = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { params } = req;
      const schemaValidate = rutUserSchema.validate(params);
      if (schemaValidate.error) {
        return next(boom.badRequest(schemaValidate.error));
      }
      const { rut } = schemaValidate.value;
      const response = await User.getByRut(rut);
      sendResponse(req, res, response);
    } catch (err: any) {
      return next(boom.badImplementation(err));
    }
  };

  const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { params } = req;
      const schemaValidate = idUserSchema.validate(params);
      if (schemaValidate.error) {
        return next(boom.badRequest(schemaValidate.error));
      }
      const { id } = schemaValidate.value;
      const response = await User.deleteById(id);
      sendResponse(req, res, response);
    } catch (err: any) {
      return next(boom.badImplementation(err));
    }
  };

  export { getAll, getByRut, deleteById};

