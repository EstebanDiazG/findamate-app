import { Request, Response, NextFunction } from "express";
import boom from "@hapi/boom";

import sendResponse from "../utils/functions/sendResponse";

import {
  idVideoSchema,
  upsertVideoSchema,
  personVideoSchema,
  personLikeVideoSchema,
  videoLikeVideoSchema,
} from "../schemas/videoSchema";

import Video from "../models/Video";
import LikeVideo from "../models/LikeVideo";
import CommentVideo from "../models/CommentVideo";

const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await Video.getAll();
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
    const schemaValidate = idVideoSchema.validate(params);
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }
    const { id } = schemaValidate.value;
    const response = await Video.getById(id);
    sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

const getByPerson = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params } = req;
    const schemaValidate = personVideoSchema.validate(params);
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }
    const { idPerson } = schemaValidate.value;
    const response = await Video.getByPerson(idPerson);
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
    const schemaValidate = upsertVideoSchema.validate(body);
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }
    const { idPerson, url, title } = schemaValidate.value;
    const response = await Video.upsert(idPerson, url, title);
    sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

const deleteById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { params } = req;
    const schemaValidate = idVideoSchema.validate(params);
    if (schemaValidate.error) {
      return next(boom.badRequest(schemaValidate.error));
    }
    const { id } = schemaValidate.value;
    const response = await Video.deleteById(id);
    sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

const likeVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { idVideo } = req.body;
    const { idPerson } = req.params;

    const schemaValidateBody = videoLikeVideoSchema.validate({ idVideo });
    if (schemaValidateBody.error) {
      return next(boom.badRequest(schemaValidateBody.error));
    }

    const schemaValidateParams = personLikeVideoSchema.validate({ idPerson });
    if (schemaValidateParams.error) {
      return next(boom.badRequest(schemaValidateParams.error));
    }

    const response = await LikeVideo.giveLike(idPerson, idVideo);
    sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

const removeLike = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { idVideo } = req.body;
    const { idPerson } = req.params;

    const schemaValidateBody = videoLikeVideoSchema.validate({ idVideo });
    if (schemaValidateBody.error) {
      return next(boom.badRequest(schemaValidateBody.error));
    }

    const schemaValidateParams = personLikeVideoSchema.validate({ idPerson });
    if (schemaValidateParams.error) {
      return next(boom.badRequest(schemaValidateParams.error));
    }

    const response = await LikeVideo.removeLike(idPerson, idVideo);
    sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

const giveComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { idVideo, content } = req.body;
    const { idPerson } = req.params;

    const schemaValidateBody = videoLikeVideoSchema.validate({ idVideo });
    if (schemaValidateBody.error) {
      return next(boom.badRequest(schemaValidateBody.error));
    }

    const schemaValidateParams = personLikeVideoSchema.validate({ idPerson });
    if (schemaValidateParams.error) {
      return next(boom.badRequest(schemaValidateParams.error));
    }

    const response = await CommentVideo.giveComment(idPerson, idVideo, content);
    sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

const removeComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { idVideo, content } = req.body;
    const { idPerson } = req.params;

    const schemaValidateBody = videoLikeVideoSchema.validate({ idVideo });
    if (schemaValidateBody.error) {
      return next(boom.badRequest(schemaValidateBody.error));
    }

    const schemaValidateParams = personLikeVideoSchema.validate({ idPerson });
    if (schemaValidateParams.error) {
      return next(boom.badRequest(schemaValidateParams.error));
    }

    const response = await CommentVideo.removeComment(
      idPerson,
      idVideo,
      content
    );
    sendResponse(req, res, response);
  } catch (err: any) {
    return next(boom.badImplementation(err));
  }
};

export {
  getAll,
  getById,
  getByPerson,
  upsert,
  deleteById,
  likeVideo,
  removeLike,
  giveComment,
  removeComment,
};
