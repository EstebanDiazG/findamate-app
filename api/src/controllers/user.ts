import { Request, Response, NextFunction } from "express";
import boom from "@hapi/boom";
import bcrypt from "bcrypt";

import sendResponse from "../utils/functions/sendResponse";

import {
  upsertUserSchema,
  idUserSchema,
  rutPersonSchema,
  updatePassword,
  validateUserSchema,
  idRolSchema,
  userIdSchema,
} from "../schemas/userSchema";

import User from "../models/User";
import UserRol from "../models/UserRol";
import Person from "../models/Person";

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

const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params } = req;
    const schemaValidate = idUserSchema.validate(params);
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }
    const { id } = schemaValidate.value;
    const response = await User.getById(id);
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
    const schemaValidate = rutPersonSchema.validate(params);
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

const upsert = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;
    const schemaValidate = upsertUserSchema.validate(body);
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }

    const { rut, name, paternalLastName, maternalLastName, email, password } =
      schemaValidate.value;

    const response = await User.upsert(
      rut,
      name,
      paternalLastName,
      maternalLastName,
      email,
      password
    );
    return sendResponse(req, res, response);
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
    const userResponse = await User.deleteById(id);
    const personResponse = await Person.deleteById(id);
    sendResponse(req, res, { user: userResponse, person: personResponse });
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

const updatePass = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;
    const schemaValidate = updatePassword.validate(body);
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }

    const { personId, password } = schemaValidate.value;

    const response = await User.updatePassword(personId, password);
    return sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

const validate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { body } = req;
    const schemaValidate = validateUserSchema.validate(body);
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }
    const { email, password } = schemaValidate.value;
    const resultUser = await User.validate(email);
    if (!resultUser) {
      return next(boom.badImplementation("Usuario no encontrado"));
    }
    const hashPassword = resultUser.hash;
    const isValid = await bcrypt.compare(password, hashPassword);

    const response = isValid
      ? { ...resultUser, password: undefined }
      : { error: "Usuario no valido" };

    return sendResponse(req, res, response);
  } catch (err: any) {
    next(boom.badImplementation(err));
  }
};

const assignRol = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const { rolId } = req.body;
    const schemaValidate = userIdSchema.validate({ userId });
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }
    const schemaValidateRol = idRolSchema.validate({ rolId });
    if (schemaValidateRol.error) {
      return next(boom.badRequest(schemaValidateRol.error));
    }
    const response = await UserRol.assignRol(userId, rolId);
    return sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

const removeRol = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const { rolId } = req.body;
    const schemaValidate = userIdSchema.validate({ userId });
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }
    const schemaValidateRol = idRolSchema.validate({ rolId });
    if (schemaValidateRol.error) {
      return next(boom.badRequest(schemaValidateRol.error));
    }
    const response = await UserRol.removeRol(userId, rolId);
    return sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

export {
  getAll,
  getById,
  getByRut,
  upsert,
  updatePass,
  deleteById,
  validate,
  assignRol,
  removeRol,
};
