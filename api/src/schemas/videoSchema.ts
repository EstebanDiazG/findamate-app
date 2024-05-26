import joi from "joi";

const upsertVideoSchema = joi.object({
  idPerson: joi.string().uuid().required(),
  url: joi.string().required(),
  title: joi.string().required(),
});

const idVideoSchema = joi.object({
  id: joi.string().uuid().required(),
});

const personVideoSchema = joi.object({
  idPerson: joi.string().uuid().required(),
});

const personLikeVideoSchema = joi.object({
  idPerson: joi.string().uuid().required(),
});

const videoLikeVideoSchema = joi.object({
  idVideo: joi.string().uuid().required(),
});

export {
  upsertVideoSchema,
  idVideoSchema,
  personVideoSchema,
  personLikeVideoSchema,
  videoLikeVideoSchema,
};
