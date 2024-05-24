import joi from 'joi';

const idInterestSchema = joi.object({
    id: joi.string().uuid().required(),
  });

export { idInterestSchema };