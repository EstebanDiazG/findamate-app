import joi from "joi";

const upsertRolSchema = joi.object({
  code: joi.string().required(),
  name: joi.string().max(60).required(),
});

const idRolSchema = joi.object({
  id: joi.string().uuid().required(),
});

const ActionRolSchema = joi.object({
  actionId: joi.string().uuid().required(),
});

export { upsertRolSchema, idRolSchema, ActionRolSchema };
