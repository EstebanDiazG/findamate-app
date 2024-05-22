import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';

import sendResponse from '../utils/functions/sendResponse';

import {
    idProfileSchema,
    id_personProfileSchema,
    updateProfileSchema
} from '../schemas/profileSchema';

import Profile from '../models/Profile';

const getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
      const response = await Profile.getAll();
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
      const schemaValidate = idProfileSchema.validate(params);
      if (schemaValidate.error) {
        return next(boom.badRequest(schemaValidate.error));
      }
      const { id } = schemaValidate.value;
      const response = await Profile.getById(id);
      sendResponse(req, res, response);
    } catch (err: any) {
      return next(boom.badImplementation(err));
    }
};

const getByIdPerson = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { params } = req;
      const schemaValidate = id_personProfileSchema.validate(params);
      if (schemaValidate.error) {
        return next(boom.badRequest(schemaValidate.error));
      }
      const { id_person } = schemaValidate.value;
      const response = await Profile.getByIdPerson(id_person);
      sendResponse(req, res, response);
    } catch (err: any) {
      return next(boom.badImplementation(err));
    }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { params } = req;
      const schemaValidate = idProfileSchema.validate(params);
      if (schemaValidate.error) {
        return next(boom.badRequest(schemaValidate.error));
      }
      const { id } = schemaValidate.value;
      const response = await Profile.deleteById(id);
      sendResponse(req, res, response);
    } catch (err: any) {
      return next(boom.badImplementation(err));
    }
};


const update = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
      const { body } = req;
      const schemaValidate = updateProfileSchema.validate(body);
      if (schemaValidate.error) {
        return next(boom.badRequest(schemaValidate.error));
      }
  
      const { name, paternalLastName, maternalLastName, password, id_image,description, idPerson } = schemaValidate.value;
  
      const response = await Profile.update(name, paternalLastName, maternalLastName,password,id_image,description,idPerson);
      return sendResponse(req, res, response);
    } catch (err: any) {
      return next(boom.badImplementation(err));
    }
};


const updatePersonProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
      const { body } = req;
      const schemaValidate = updateProfileSchema.validate(body);
      if (schemaValidate.error) {
        return next(boom.badRequest(schemaValidate.error));
      }
  
      const { name, paternalLastName, maternalLastName, idPerson } = schemaValidate.value;
  
      const response = await Profile.updatePersonProfile(name, paternalLastName, maternalLastName,idPerson);
      return sendResponse(req, res, response);
    } catch (err: any) {
      return next(boom.badImplementation(err));
    }
};

export { getAll, getById, getByIdPerson, deleteById, updatePersonProfile };