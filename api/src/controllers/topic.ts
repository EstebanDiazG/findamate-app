import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';

import sendResponse from '../utils/functions/sendResponse';

import {
    idTopicSchema,
    idPersonTopicSchema,
    createTopicSchema,
    updateTopicSchema
} from '../schemas/topicSchema';

import Topic from '../models/Topic';

const getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
      const response = await Topic.getAll();
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
      const schemaValidate = idTopicSchema.validate(params);
      if (schemaValidate.error) {
        return next(boom.badRequest(schemaValidate.error));
      }
      const { id } = schemaValidate.value;
      const response = await Topic.getById(id);
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
      const schemaValidate = idPersonTopicSchema.validate(params);
      if (schemaValidate.error) {
        return next(boom.badRequest(schemaValidate.error));
      }
      const { id_person } = schemaValidate.value;
      const response = await Topic.getByIdPerson(id_person);
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
      const schemaValidate = createTopicSchema.validate(body);
      if (schemaValidate.error) {
        return next(boom.badRequest(schemaValidate.error));
      }
  
      const { id_person, title, content } =
        schemaValidate.value;
  
      const response = await Topic.upsert(
        id_person,
        title,
        content
      );
      return sendResponse(req, res, response);
    } catch (err: any) {
      return next(boom.badImplementation(err));
    }
  };

  const update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const schemaValidate = idTopicSchema.validate({ id });
      if (schemaValidate.error) {
        return next(boom.badRequest(schemaValidate.error));
      }
      const schemaValidate2 = updateTopicSchema.validate({ content });
      if (schemaValidate2.error) {
        return next(boom.badRequest(schemaValidate2.error));
      }
      const response = await Topic.update(id,content);
      return sendResponse(req, res, response);
    } catch (err: any) {
      return next(boom.badImplementation(err));
    }
  };

  const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { params } = req;
      const schemaValidate = idTopicSchema.validate(params);
      if (schemaValidate.error) {
        return next(boom.badRequest(schemaValidate.error));
      }
      const { id } = schemaValidate.value;
      const response = await Topic.deleteById(id);
      sendResponse(req, res, response);
    } catch (err: any) {
      return next(boom.badImplementation(err));
    }
};

export { getAll, getById, getByIdPerson, upsert, update, deleteById };