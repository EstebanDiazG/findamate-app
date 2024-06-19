import joi from "joi";

export const mediaIdParams = joi.object({
  id: joi.string().uuid().required(),
});

export const searchMediaSchema = joi.object({
  page: joi.number().default(1),
  limit: joi.number().default(10),
  statusCode: joi.number(),
});
