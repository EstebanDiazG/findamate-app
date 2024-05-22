import joi from 'joi';

const idProfileSchema = joi.object({
    id: joi.string().uuid().required(),
});

const id_personProfileSchema = joi.object({
  id_person: joi.string().uuid().required(),
});

const updateProfileSchema = joi.object({

  Name: joi.string().optional(),
  paternalLastName: joi.string().optional(),
  maternalLastName: joi.string().optional(),
  password: joi.string().optional(),
  description: joi.string().optional(),
  id_imagen: joi.string().uuid().optional(),
  id_person: joi.string().uuid().required(),
});

export { idProfileSchema, id_personProfileSchema, updateProfileSchema };