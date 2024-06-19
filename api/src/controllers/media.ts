import fs from "fs";
import path from "path";
import boom from "@hapi/boom";
import sharp from "sharp";
import { Request, Response, NextFunction } from "express";
import Media from "../models/Media";
import { mediaUploadDir, mediaUploadUrl, limit } from "../utils/functions/config";
import sendResponse from "../utils/functions/sendResponse";
import { mediaIdParams, searchMediaSchema } from "../schemas/mediaSchema";

interface MulterFile {
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
  fieldname: string;
}

type MediaType = {
  id?: number;
  filename: string;
  url: string;
  mimetype: string;
  // Agrega más propiedades según sea necesario
};

export const deleteMediaById = async (req: Request, res: Response, next: NextFunction) => {
  const { params } = req;
  const validateSchemaParams = mediaIdParams.validate(params);
  if (validateSchemaParams.error)
    return next(boom.badImplementation(validateSchemaParams.error));
  const { id } = validateSchemaParams.value;

  Media.getById(id)
    .then((response) => {
      const mediaPath = `${mediaUploadDir}/${response.internal_name}`;
      fs.unlink(mediaPath, (e) => {
        if (e) return next(boom.badImplementation(e));

        Media.deleteById(id)
          .then((id) => {
            if (!id) return next();
            return sendResponse(req, res, { success: true });
          })
          .catch((e) => next(boom.badImplementation(e)));
      });
    })
    .catch((e) => next(boom.badImplementation(e)));
};

export const getMediaById = (req: Request, res: Response, next: NextFunction) => {
  const { params } = req;
  const validateSchemaParams = mediaIdParams.validate(params);
  if (validateSchemaParams.error)
    return next(boom.badImplementation(validateSchemaParams.error));
  const { id } = validateSchemaParams.value;

  Media.getById(id)
    .then((response) => {
      if (response) return sendResponse(req, res, response);
      next();
    })
    .catch((e) => next(boom.badImplementation(e)));
};

export const searchMedia = (req: Request, res: Response, next: NextFunction) => {
  const { query } = req;
  const validateSchema = searchMediaSchema.validate(query);
  if (validateSchema.error) {
    return next(boom.badImplementation(validateSchema.error));
  }

  const { page, statusCode } = validateSchema.value;
  Media.search({
    page,
    statusCode,
    limit: limit,
  })
    .then((media) => {
      const total = media.length ? Number(media[0].total) : 0;
      sendResponse(req, res, {
        results: media,
        total,
        limit,
        pages: Math.ceil(total / limit),
      });
    })
    .catch((e) => next(boom.badImplementation(e)));
};

export const uploadMedia = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return next(boom.badRequest("No file uploaded"));
  }

  try {
    const internalname = `${Date.now()}-${req.file.originalname}`;
    const filepath = path.join(mediaUploadDir, internalname);
    fs.mkdirSync(path.dirname(filepath), { recursive: true });

    let media: Partial<MediaType>;
    if (req.file.mimetype.startsWith("image/")) {
      const buffer = req.file.buffer;
      await sharp(buffer)
        .resize(1000, null, { withoutEnlargement: true })
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .jpeg({ mozjpeg: true })
        .rotate()
        .toFile(filepath);

      const metadata = await sharp(filepath).metadata();
      media = {
        mimetype: req.file.mimetype,
        filename: internalname,
        url: filepath,
        // Agrega más propiedades según sea necesario
      };
    } else {
      fs.writeFileSync(filepath, req.file.buffer);
      media = {
        mimetype: req.file.mimetype,
        filename: internalname,
        url: filepath,
        // Agrega más propiedades según sea necesario
      };
    }

    const mediaId = await Media.create(media);
    const mediaUrl = `${mediaUploadUrl}/${internalname}`;
    res.status(200).send({
      message: "Media processed successfully",
      id: mediaId,
      url: mediaUrl,
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    next(boom.internal("Unexpected error"));
  }
};
