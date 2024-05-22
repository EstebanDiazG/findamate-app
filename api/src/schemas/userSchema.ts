import joi from "joi";

const upsertUserSchema = joi.object({
  rut: joi
    .string()
    .pattern(/^\d{7,8}-[\dk]$/)
    .required(),
  name: joi.string().required(),
  paternalLastName: joi.string().required(),
  maternalLastName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const idUserSchema = joi.object({
  id: joi.string().uuid().required(),
});

const rutPersonSchema = joi.object({
  rut: joi
    .string()
    .pattern(/^\d{7,8}-[\dk]$/)
    .required(),
});

const updatePassword = joi.object({
  personId: joi.string().uuid().required(),
  password: joi.string().required(),
});

const validateUserSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

const idRolSchema = joi.object({
  rolId: joi.string().uuid().required(),
});

const userIdSchema = joi.object({
  userId: joi.string().uuid().required(),
});

export {
  upsertUserSchema,
  idUserSchema,
  rutPersonSchema,
  updatePassword,
  validateUserSchema,
  idRolSchema,
  userIdSchema,
};
