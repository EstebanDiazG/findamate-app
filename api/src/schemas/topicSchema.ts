import joi from "joi";

const idTopicSchema = joi.object({
  id: joi.string().uuid().required(),
});

const idPersonTopicSchema = joi.object({
  id_person: joi.string().uuid().required(),
});

const createTopicSchema = joi.object({
  id_person: joi.string().uuid().required(),
  title: joi.string().required(),
  content: joi.string().optional(),
  id_interest: joi.string().uuid().required(),
});

const updateTopicSchema = joi.object({
  content: joi.string().optional(),
});

export {
  idTopicSchema,
  idPersonTopicSchema,
  createTopicSchema,
  updateTopicSchema,
};
