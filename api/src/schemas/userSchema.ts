import joi from 'joi';

const upsertUserSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  hash: joi.string().required(),
});

const idUserSchema = joi.object({
  id: joi.string().uuid().required(),
});

const emailUserSchema = joi.object({
  email: joi.string().required(),
});

export { upsertUserSchema, idUserSchema, emailUserSchema };
