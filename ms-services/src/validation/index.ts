import Joi from 'joi'; 

export const reg_schema = Joi.object({
  first_name: Joi.string().required().messages({
    "string.base": 'First name should be a type of string.',
    "string.empty": 'First name can not be an empty field.',
  }),
  last_name: Joi.string().required().messages({
    "string.base": 'Last name should be a type of string.',
    "string.empty": 'Last name can not be an empty field.',
  }),
  email: Joi.string().email().required().messages({
    "string.base": 'Email should be a type of string.',
    "string.empty": 'Email can not be an empty field.',
    "string.email": 'Please enter a correct email.',
  }),
  phone: Joi.string().regex(/^[0-9]{10}$/).required().messages({
    "string.base": 'Phone number should be a type of string.',
    "string.pattern.base": `Phone number must have 10 digits.`,
  }),
  password: Joi.string().trim().min(8).max(36).required().messages({
    "string.base": 'Password should be a type of string.',
    "string.empty": 'Password can not be an empty field.',
    "string.max": 'Password length must be less than or equal to 36 characters long',
    "string.min": 'Password length must be at least 8 characters long',
    "string.trim": 'Password must not have leading or trailing whitespace',
  }),
});

export const log_schema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": 'Email should be a type of string.',
    "string.empty": 'Email can not be an empty field.',
    "string.email": 'Please enter a correct email.',
    "any.required": 'Email is a required.',
  }),
  password: Joi.string().required().messages({
    "string.base": 'Password should be a type of string.',
    "string.empty": 'Password can not be an empty field.',
    "any.required": 'Password is a required field',
  }),
});