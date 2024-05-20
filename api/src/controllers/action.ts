import { Request, Response, NextFunction } from "express";
import boom from "@hapi/boom";

import sendResponse from "../utils/functions/sendResponse";

import {
  codeActionSchema,
  idActionSchema,
  upsertActionSchema,
} from "../schemas/actionSchema";

import Action from "../models/Action";

const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await Action.getAll();
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
    const schemaValidate = idActionSchema.validate(params);
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }
    const { id } = schemaValidate.value;
    const response = await Action.getById(id);
    sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

const getByCode = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params } = req;
    const schemaValidate = codeActionSchema.validate(params);
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }
    const { code } = schemaValidate.value;
    const response = await Action.getByCode(code);
    sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

const upsert = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;
    const schemaValidate = upsertActionSchema.validate(body);
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }

    const { code, description } = schemaValidate.value;

    const response = await Action.upsert(code, description);
    return sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = req;
    const schemaValidate = idActionSchema.validate(params);
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }
    const { id } = schemaValidate.value;
    const response = await Action.deleteById(id);
    sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

export { getAll, getById, getByCode, upsert, deleteById };
