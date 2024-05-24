import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';

import sendResponse from '../utils/functions/sendResponse';

import {
    idInterestSchema
} from '../schemas/interestSchema';

import Interest from '../models/Interest';

const getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const response = await Interest.getAll();
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
    const schemaValidate = idInterestSchema.validate(params);
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }
    const { id } = schemaValidate.value;
    const response = await Interest.getById(id);
    sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = req;
    const schemaValidate = idInterestSchema.validate(params);
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }
    const { id } = schemaValidate.value;
    const response = await Interest.deleteById(id);
    sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

export { getAll, getById, deleteById };