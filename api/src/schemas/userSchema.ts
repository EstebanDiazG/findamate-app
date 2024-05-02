import joi from 'joi';

const upsertUserSchema = joi.object({
  email: joi.string().required(),
  password: joi
    .string()
    .regex(/^(?=.*[!@#$%^&*()-+=])(?=.*[0-9]).{8}$/)
    .required(),
  personId: joi.required(),
});

const idUserSchema = joi.object({
  id: joi.string().uuid().required(),
});

const rutUserSchema = joi.object({
  rut: joi
    .string()
    .pattern(/^\d{7,8}-[\dk]$/)
    .required(),
});

export { upsertUserSchema, idUserSchema, rutUserSchema };
