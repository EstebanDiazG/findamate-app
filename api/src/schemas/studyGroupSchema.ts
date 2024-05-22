import joi from "joi";

const upsertStudyGroupSchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  type: joi.string().required(),
});

const idStudyGroupSchema = joi.object({
  id: joi.string().uuid().required(),
});

export { upsertStudyGroupSchema, idStudyGroupSchema };
