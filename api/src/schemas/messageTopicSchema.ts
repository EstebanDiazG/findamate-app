import joi from "joi";

const idMessageTopicSchema = joi.object({
    id: joi.string().uuid().required(),
});

const idPersonMessageTopicSchema = joi.object({
    id_person: joi.string().uuid().required(),
});

const idTopicMessageTopicSchema = joi.object({
    id_topic: joi.string().uuid().required(),
});

const createMesaggeSchema = joi.object({
    id_person: joi.string().uuid().required(),
    id_topic: joi.string().uuid().required(),
    content: joi.string().optional(),
});

const updateMessageSchema = joi.object({
    content: joi.string().optional()
});

export { idMessageTopicSchema, idPersonMessageTopicSchema, idTopicMessageTopicSchema, createMesaggeSchema, updateMessageSchema };