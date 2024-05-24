import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';

import sendResponse from '../utils/functions/sendResponse';

import {
    idCategoryInterestSchema
} from '../schemas/categoryinterestSchema';

import categoryInterest from '../models/CategoryInterest';

const getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const response = await categoryInterest.getAll();
      sendResponse(req, res, response);
    } catch (err: any) {
      return next(boom.badImplementation(err));
    }
};

const getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { params } = req;
      const schemaValidate = idCategoryInterestSchema.validate(params);
      if (schemaValidate.error) {
        return next(boom.badRequest(schemaValidate.error));
      }
      const { id } = schemaValidate.value;
      const response = await categoryInterest.getById(id);
      sendResponse(req, res, response);
    } catch (err: any) {
      return next(boom.badImplementation(err));
    }
  };

  const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { params } = req;
      const schemaValidate = idCategoryInterestSchema.validate(params);
      if (schemaValidate.error) {
        return next(boom.badRequest(schemaValidate.error));
      }
      const { id } = schemaValidate.value;
      const response = await categoryInterest.deleteById(id);
      sendResponse(req, res, response);
    } catch (err: any) {
      return next(boom.badImplementation(err));
    }
  };

export { getAll, getById, deleteById };