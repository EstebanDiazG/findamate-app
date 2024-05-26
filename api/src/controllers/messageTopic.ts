import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';

import sendResponse from '../utils/functions/sendResponse';

import {
    idMessageTopicSchema,
    idPersonMessageTopicSchema,
    idTopicMessageTopicSchema,
    createMesaggeSchema,
    updateMessageSchema
} from '../schemas/messageTopicSchema';

import MessageTopic from '../models/MessageTopic';

const getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
      const response = await MessageTopic.getAll();
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
      const schemaValidate = idMessageTopicSchema.validate(params);
      if (schemaValidate.error) {
        return next(boom.badRequest(schemaValidate.error));
      }
      const { id } = schemaValidate.value;
      const response = await MessageTopic.getById(id);
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
      const schemaValidate = idPersonMessageTopicSchema.validate(params);
      if (schemaValidate.error) {
        return next(boom.badRequest(schemaValidate.error));
      }
      const { id_person } = schemaValidate.value;
      const response = await MessageTopic.getByIdPerson(id_person);
      sendResponse(req, res, response);
    } catch (err: any) {
      return next(boom.badImplementation(err));
    }
};

const getByIdTopic = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { params } = req;
      const schemaValidate = idTopicMessageTopicSchema.validate(params);
      if (schemaValidate.error) {
        return next(boom.badRequest(schemaValidate.error));
      }
      const { id_topic } = schemaValidate.value;
      const response = await MessageTopic.getByIdTopic(id_topic);
      sendResponse(req, res, response);
    } catch (err: any) {
      return next(boom.badImplementation(err));
    }
};

const createMessage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { body } = req;
      const schemaValidate = createMesaggeSchema.validate(body);
      if (schemaValidate.error) {
        return next(boom.badRequest(schemaValidate.error));
      }
  
      const { id_person, id_topic, content } =
        schemaValidate.value;
  
      const response = await MessageTopic.createMessage(
        id_person,
        id_topic,
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
      const schemaValidate = idMessageTopicSchema.validate({ id });
      if (schemaValidate.error) {
        return next(boom.badRequest(schemaValidate.error));
      }
      const schemaValidate2 = updateMessageSchema.validate({ content });
      if (schemaValidate2.error) {
        return next(boom.badRequest(schemaValidate2.error));
      }
      const response = await MessageTopic.update(id,content);
      return sendResponse(req, res, response);
    } catch (err: any) {
      return next(boom.badImplementation(err));
    }
  };

  const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { params } = req;
      const schemaValidate = idMessageTopicSchema.validate(params);
      if (schemaValidate.error) {
        return next(boom.badRequest(schemaValidate.error));
      }
      const { id } = schemaValidate.value;
      const response = await MessageTopic.deleteById(id);
      sendResponse(req, res, response);
    } catch (err: any) {
      return next(boom.badImplementation(err));
    }
  };

export { getAll, getById, getByIdPerson, getByIdTopic, createMessage, update, deleteById };