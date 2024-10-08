import joi from "joi";

const idProfileSchema = joi.object({
  id: joi.string().uuid().required(),
});

const id_personProfileSchema = joi.object({
  id_person: joi.string().uuid().required(),
});

const updateProfileSchema = joi.object({
  description: joi.string(),
  name: joi.string(),
  paternalLastName: joi.string(),
  maternalLastName: joi.string(),
});

export { idProfileSchema, id_personProfileSchema, updateProfileSchema };
