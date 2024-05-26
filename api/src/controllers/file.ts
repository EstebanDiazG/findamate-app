import fs from "fs";
import path from "path";
import boom from "@hapi/boom";
import { filesUploadDir, filesUploadUrl } from "../utils/functions/config";
import { Request, Response, NextFunction } from "express";
import File from "../models/File";
import {
  imagesUploadDir,
  imagesUploadUrl,
  limit,
} from "../utils/functions/config";
import sendResponse from "../utils/functions/sendResponse";
import { fileIdParams, searchFilesSchema } from "../schemas/fileSchema";

interface MulterFile {
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
  fieldname: string;
}

export const deleteFileById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { params } = req;
  const validateSchemaParams = fileIdParams.validate(params);
  if (validateSchemaParams.error)
    return next(boom.badImplementation(validateSchemaParams.error));
  const { id } = validateSchemaParams.value;

  File.getById(id)
    .then((response) => {
      const filePath = `${filesUploadDir}/${response.internal_name}`;
      fs.unlink(filePath, (e) => {
        if (e) return next(boom.badImplementation(e));

        File.deleteById(id)
          .then((id) => {
            if (!id) return next();
            return sendResponse(req, res, { success: true });
          })
          .catch((e) => next(boom.badImplementation(e)));
      });
    })
    .catch((e) => next(boom.badImplementation(e)));
};

export const getFileById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { params } = req;
  const validateSchemaParams = fileIdParams.validate(params);
  if (validateSchemaParams.error)
    return next(boom.badImplementation(validateSchemaParams.error));
  const { id } = validateSchemaParams.value;

  File.getById(id)
    .then((response) => {
      if (response) return sendResponse(req, res, response);
      next();
    })
    .catch((e) => next(boom.badImplementation(e)));
};

export const searchFiles = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validateSchemaQuery = searchFilesSchema.validate(req.query);
  if (validateSchemaQuery.error)
    return next(boom.badImplementation(validateSchemaQuery.error));
  const { page, limit: queryLimit, statusCode } = validateSchemaQuery.value; // Extraer statusCode de validateSchemaQuery.value

  File.search({ page, statusCode, limit: queryLimit || limit })
    .then((files) => {
      const total = files.length ? Number(files[0].total) : 0;

      sendResponse(req, res, {
        results: files,
        total,
        limit: queryLimit || limit,
        pages: Math.ceil(total / (queryLimit || limit)),
      });
    })
    .catch((e) => next(boom.badImplementation(e)));
};

export const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return next(boom.badRequest("No file uploaded"));
  }

  try {
    if (req.file.mimetype !== "application/pdf") {
      return next(
        boom.badRequest("Unsupported file type. Only PDF files are supported.")
      );
    }

    const internalname = `${Date.now()}-${req.file.originalname}`;
    const filepath = path.join(filesUploadDir, internalname);
    fs.mkdirSync(path.dirname(filepath), { recursive: true });

    try {
      fs.writeFileSync(filepath, req.file.buffer);
    } catch (err) {
      console.error("Error writing file:", err);
      return next(boom.internal("Error writing file"));
    }

    const file: File = {
      originalname: req.file.originalname,
      internalname: internalname,
      mimetype: req.file.mimetype,
      format: "pdf",
      size: req.file.size,
      path: filepath,
      encoding: req.file.encoding,
    };
    let fileId;
    try {
      fileId = await File.create(file);
    } catch (err) {
      console.error("Error creating file record:", err);
      return next(boom.internal("Error creating file record"));
    }

    const fileUrl = `${filesUploadUrl}/${internalname}`; // Usa filesUploadUrl para construir la URL del archivo

    res.status(200).send({
      message: "File processed successfully",
      id: fileId,
      url: fileUrl,
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    next(boom.internal("Unexpected error"));
  }
};
