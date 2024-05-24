import joi from 'joi';

const idCategoryInterestSchema = joi.object({
    id: joi.string().uuid().required(),
  });

export { idCategoryInterestSchema };