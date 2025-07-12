import Joi from 'joi';

export const registerValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const postValidator = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  image: Joi.string().optional(),
});

export const commentValidator = Joi.object({
  content: Joi.string().required(),
});