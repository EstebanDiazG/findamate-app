import { Request, Response, NextFunction } from "express";
import boom from "@hapi/boom";

import sendResponse from "../utils/functions/sendResponse";

import {
  upsertPersonSchema,
  idPersonSchema,
  rutPersonSchema,
  idPersonGroupSchema,
  idStudyGroupSchema,
} from "../schemas/personSchema";

import Person from "../models/Person";
import StudyGroupPerson from "../models/studyGroupPerson";

const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await Person.getAll();
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
    const schemaValidate = idPersonSchema.validate(params);
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }
    const { id } = schemaValidate.value;
    const response = await Person.getById(id);
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
    const response = await Person.getByRut(rut);
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
    const schemaValidate = upsertPersonSchema.validate(body);
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }

    const { rut, name, paternalLastName, maternalLastName, email } =
      schemaValidate.value;

    const response = await Person.upsert(
      rut,
      name,
      paternalLastName,
      maternalLastName,
      email
    );
    return sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = req;
    const schemaValidate = idPersonSchema.validate(params);
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }
    const { id } = schemaValidate.value;
    const response = await Person.deleteById(id);
    sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

const assignPerson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { personId } = req.params;
    const { groupId } = req.body;
    const schemaValidate = idPersonGroupSchema.validate({ personId });
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }
    const schemaValidate2 = idStudyGroupSchema.validate({ groupId });
    if (schemaValidate2.error) {
      return next(boom.badRequest(schemaValidate2.error));
    }
    const response = await StudyGroupPerson.assignPerson(personId, groupId);
    return sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

const removePerson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { personId } = req.params;
    const { groupId } = req.body;
    const schemaValidate = idPersonGroupSchema.validate({ personId });
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }
    const schemaValidate2 = idStudyGroupSchema.validate({ groupId });
    if (schemaValidate2.error) {
      return next(boom.badRequest(schemaValidate2.error));
    }
    const response = await StudyGroupPerson.removePerson(personId, groupId);
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
  deleteById,
  assignPerson,
  removePerson,
};
