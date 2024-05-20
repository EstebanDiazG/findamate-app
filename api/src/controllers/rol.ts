import { Request, Response, NextFunction } from "express";
import boom from "@hapi/boom";

import sendResponse from "../utils/functions/sendResponse";

import {
  upsertRolSchema,
  idRolSchema,
  ActionRolSchema,
} from "../schemas/rolSchema";

import Rol from "../models/Rol";
import RolAction from "../models/RolAction";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await Rol.getAll();
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
    const schemaValidate = idRolSchema.validate(params);
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }
    const { id } = schemaValidate.value;
    const response = await Rol.getById(id);
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
    const schemaValidate = upsertRolSchema.validate(body);
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }
    const { code, name } = schemaValidate.value;

    const response = await Rol.upsert(code, name);
    return sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = req;
    const schemaValidate = idRolSchema.validate(params);
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }
    const { id } = schemaValidate.value;
    const response = await Rol.deleteById(id);
    return sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

const assignAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { actionId } = req.body;

    const schemaValidate = idRolSchema.validate({ id });
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }
    const schemaValidateRol = ActionRolSchema.validate({ actionId });
    if (schemaValidateRol.error) {
      return next(boom.badRequest(schemaValidateRol.error));
    }
    const response = await RolAction.assignAction(id, actionId);
    return sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

const removeAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { actionId } = req.body;

    const schemaValidate = idRolSchema.validate({ id });
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }
    const schemaValidateRol = ActionRolSchema.validate({ actionId });
    if (schemaValidateRol.error) {
      return next(boom.badRequest(schemaValidateRol.error));
    }
    const response = await RolAction.removeAction(id, actionId);
    return sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

export { getAll, getById, upsert, deleteById, assignAction, removeAction };
