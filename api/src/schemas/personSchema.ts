import joi from "joi";

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

const idStudyGroupSchema = joi.object({
  groupId: joi.string().uuid().required(),
});

const idPersonGroupSchema = joi.object({
  personId: joi.string().uuid().required(),
});

const idInterestGroupSchema = joi.object({
  id_interest: joi.string().uuid().required(),
});

const idPersonInterestGroupSchema = joi.object({
  id_person: joi.string().uuid().required(),
  state: joi.string(),
});

export {
  upsertPersonSchema,
  idPersonSchema,
  rutPersonSchema,
  idStudyGroupSchema,
  idPersonGroupSchema,
  idInterestGroupSchema,
  idPersonInterestGroupSchema,
};
