import joi from "joi";

export const searchImagesSchema = joi.object({
  page: joi.number().integer().min(1).default(1),
  statusCode: joi.number().allow(0, 1, null).empty("").default(null),
});

export const imageIdParams = joi
  .object({
    id: joi.string().uuid().required(),
  })
  .required();
