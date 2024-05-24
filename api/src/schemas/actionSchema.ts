import joi from "joi";

const upsertActionSchema = joi.object({
  code: joi.string().required(),
  description: joi.string().required(),
});

const idActionSchema = joi.object({
  id: joi.string().uuid().required(),
});

const codeActionSchema = joi.object({
  code: joi.string().required(),
});

export { upsertActionSchema, idActionSchema, codeActionSchema };
