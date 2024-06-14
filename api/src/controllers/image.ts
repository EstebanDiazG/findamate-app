import fs from "fs";
import path from "path";
import boom from "@hapi/boom";
import sharp from "sharp";
import { Request, Response, NextFunction } from "express";
import Image from "../models/Image";
import {
  imagesUploadDir,
  imagesUploadUrl,
  limit,
} from "../utils/functions/config";
import sendResponse from "../utils/functions/sendResponse";
import { imageIdParams, searchImagesSchema } from "../schemas/imageSchema";

interface MulterFile {
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
  fieldname: string;
}

export const deleteImageById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { params } = req;
  const validateSchemaParams = imageIdParams.validate(params);
  if (validateSchemaParams.error)
    return next(boom.badImplementation(validateSchemaParams.error));
  const { id } = validateSchemaParams.value;

  Image.getById(id)
    .then((response) => {
      const imagePath = `${imagesUploadDir}/${response.id}.jpg`;
      console.log(imagePath);
      fs.unlink(imagePath, (e) => {
        if (e) return next(boom.badImplementation(e));

        Image.deleteById(id)
          .then((id) => {
            if (!id) return next();
            return sendResponse(req, res, { success: true });
          })
          .catch((e) => next(boom.badImplementation(e)));
      });
    })
    .catch((e) => next(boom.badImplementation(e)));
};

export const getImageById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { params } = req;
  const validateSchemaParams = imageIdParams.validate(params);
  if (validateSchemaParams.error)
    return next(boom.badImplementation(validateSchemaParams.error));
  const { id } = validateSchemaParams.value;

  Image.getById(id)
    .then((response) => {
      if (response) return sendResponse(req, res, response);
      next();
    })
    .catch((e) => next(boom.badImplementation(e)));
};

export const searchImages = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { query } = req;
  const validateSchema = searchImagesSchema.validate(query);
  if (validateSchema.error) {
    return next(boom.badImplementation(validateSchema.error));
  }

  const { page, statusCode } = validateSchema.value;
  Image.search({
    page,
    statusCode,
    limit: limit,
  })
    .then((images) => {
      const data = images.map((image) => ({
        id: image.id,
        url: image.url,
      }));

      sendResponse(req, res, data);
    })
    .catch((e) => next(boom.badImplementation(e)));
};

export const uploadImage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return next(boom.badRequest("File is missing"));
  }
  const file = req.file;
  const buffer = file.buffer;
  Image.create({
    fieldname: file.fieldname,
    originalname: file.originalname,
    encoding: file.encoding,
    mimetype: file.mimetype,
  })
    .then((imageId) => {
      console.log(imagesUploadDir);
      sharp(buffer)
        .resize(1000, null, {
          withoutEnlargement: true,
        })
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .jpeg({ mozjpeg: true })
        .rotate()
        .toFile(`${imagesUploadDir}/${imageId}.jpg`, (err, info) => {
          if (err) {
            return next(boom.unsupportedMediaType(err));
          }

          Image.updateById(imageId, {
            format: info.format,
            width: info.width,
            height: info.height,
            size: info.size,
          })
            .then(() =>
              sendResponse(req, res, {
                id: imageId,
                url: `${imagesUploadUrl}/${imageId}.jpg`,
              })
            )
            .catch((e) =>
              sendResponse(req, res, {
                message: "Successfully uploaded file",
                error: "Could not determine file size",
              })
            );
        });
    })
    .catch((e) => next(boom.badImplementation(e)));
};
