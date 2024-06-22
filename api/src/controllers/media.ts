import fs from "fs";
import path from "path";
import boom from "@hapi/boom";
import sharp from "sharp";
import { Request, Response, NextFunction } from "express";
import Media from "../models/Media";
import {
  mediaUploadDir,
  mediaUploadUrl,
  limit,
} from "../utils/functions/config";
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
  width?: number;
  height?: number;
};

export const deleteMediaById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { params } = req;
  const { error, value } = mediaIdParams.validate(params);
  if (error) return next(boom.badRequest(error));

  const { id } = value;

  try {
    const deletedId = await Media.deleteById(id);
    if (!deletedId) return next(boom.notFound("Failed to delete media"));

    sendResponse(req, res, { success: true });
  } catch (err) {
    next(boom.badImplementation(err as any));
  }
};

export const getMediaById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { params } = req;
  const { error, value } = mediaIdParams.validate(params);
  if (error) return next(boom.badRequest(error));

  const { id } = value;

  try {
    const media = await Media.getById(id);
    if (!media) return next(boom.notFound("Media not found"));

    sendResponse(req, res, media);
  } catch (err) {
    next(boom.badImplementation(err as any));
  }
};

export const searchMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { query } = req;
  const { error, value } = searchMediaSchema.validate(query);
  if (error) return next(boom.badRequest(error));

  const { page, statusCode } = value;
  try {
    const media = await Media.search({ page, statusCode, limit });
    sendResponse(req, res, media);
  } catch (err) {
    next(boom.badImplementation(err as any));
  }
};

export const uploadMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) return next(boom.badRequest("No file uploaded"));

  try {
    const internalName = `${Date.now()}-${req.file.originalname}`;
    const filePath = path.join(mediaUploadDir, internalName);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    let media: Partial<MediaType>;
    if (req.file.mimetype.startsWith("image/")) {
      const buffer = req.file.buffer;
      await sharp(buffer)
        .resize(1000, null, { withoutEnlargement: true })
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .jpeg({ mozjpeg: true })
        .rotate()
        .toFile(filePath);

      const metadata = await sharp(filePath).metadata();
      media = {
        mimetype: req.file.mimetype,
        filename: internalName,
        url: filePath,
        width: metadata.width,
        height: metadata.height,
      };
    } else {
      fs.writeFileSync(filePath, req.file.buffer);
      media = {
        mimetype: req.file.mimetype,
        filename: internalName,
        url: filePath,
      };
    }

    const mediaId = await Media.create({
      type: req.file.mimetype.split("/")[0],
      original_name: req.file.originalname,
      internal_name: internalName,
      mimetype: req.file.mimetype,
      format: req.file.mimetype.split("/")[1],
      encoding: req.file.encoding,
      path: filePath,
      size: req.file.size,
      width: media.width,
      height: media.height,
    });
    const mediaUrl = `${mediaUploadUrl}/${internalName}`;
    res.status(200).send({
      message: "Media processed successfully",
      id: mediaId,
      url: mediaUrl,
    });
  } catch (err) {
    next(boom.internal("Unexpected error"));
  }
};
