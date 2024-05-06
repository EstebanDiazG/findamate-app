import joi from 'joi';

const upsertPersonSchema = joi.object({
  rut: joi
    .string()
    .pattern(/^\d{7,8}-[\dk]$/)
    .required(),
  name: joi.string().required(),
  paternalLastName: joi.string().required(),
  maternalLastName: joi.string().required(),
  email: joi.string().required(),
});

const idPersonSchema = joi.object({
  id: joi.string().uuid().required(),
});

const rutPersonSchema = joi.object({
  rut: joi
    .string()
    .pattern(/^\d{7,8}-[\dk]$/)
    .required(),
});

export { upsertPersonSchema, idPersonSchema, rutPersonSchema };
