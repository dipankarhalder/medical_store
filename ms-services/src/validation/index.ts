import Joi from 'joi';

export const reg_schema = Joi.object({
  first_name: Joi.string().required().messages({
    'string.base': 'First name should be a type of string.',
    'string.empty': 'First name can not be an empty field.',
    'any.required': 'First name is a required field.',
  }),
  last_name: Joi.string().required().messages({
    'string.base': 'Last name should be a type of string.',
    'string.empty': 'Last name can not be an empty field.',
    'any.required': 'Last name is a required field.',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email should be a type of string.',
    'string.empty': 'Email can not be an empty field.',
    'string.email': 'Please enter a correct email.',
    'any.required': 'Email is a required field.',
  }),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({
      'string.base':
        'Phone number should be a type of string.',
      'string.pattern.base': `Phone number must have 10 digits.`,
    }),
  password: Joi.string()
    .trim()
    .min(8)
    .max(36)
    .required()
    .messages({
      'string.base': 'Password should be a type of string.',
      'string.empty': 'Password can not be an empty field.',
      'string.max':
        'Password length must be less than or equal to 36 characters long',
      'string.min':
        'Password length must be at least 8 characters long',
      'string.trim':
        'Password must not have leading or trailing whitespace',
      'any.required': 'Password is a required field.',
    }),
  role: Joi.string().required().messages({
    'string.base': 'Role should be a type of string.',
    'string.empty': 'Role can not be an empty field.',
    'any.required': 'Role is a required field.',
  }),
});

export const log_schema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email should be a type of string.',
    'string.empty': 'Email can not be an empty field.',
    'string.email': 'Please enter a correct email.',
    'any.required': 'Email is a required field.',
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password should be a type of string.',
    'string.empty': 'Password can not be an empty field.',
    'any.required': 'Password is a required field.',
  }),
});

export const update_schema = Joi.object({
  first_name: Joi.string().required().messages({
    'string.base': 'First name should be a type of string.',
    'string.empty': 'First name can not be an empty field.',
    'any.required': 'First name is a required field.',
  }),
  last_name: Joi.string().required().messages({
    'string.base': 'Last name should be a type of string.',
    'string.empty': 'Last name can not be an empty field.',
    'any.required': 'Last name is a required field.',
  }),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({
      'string.base':
        'Phone number should be a type of string.',
      'string.pattern.base': `Phone number must have 10 digits.`,
    }),
});

export const slots_schema = Joi.object({
  slot_name: Joi.string().required().messages({
    'string.base': 'Slot name should be a type of string.',
    'string.empty': 'Slot name can not be an empty field.',
    'any.required': 'Slot name is a required field.',
  }),
});

export const med_schema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Name should be a type of string.',
    'string.empty': 'Name can not be an empty field.',
    'any.required': 'Name is a required field.',
  }),
  busket_id: Joi.string().required().messages({
    'string.base': 'Busket id should be a type of string.',
    'string.empty': 'Busket id can not be an empty field.',
    'any.required': 'Busket id is a required field.',
  }),
  pices: Joi.string().required().messages({
    'string.base': 'Pices should be a type of string.',
    'string.empty': 'Pices can not be an empty field.',
    'any.required': 'Pices is a required field.',
  }),
  price: Joi.string().required().messages({
    'string.base': 'Price should be a type of string.',
    'string.empty': 'Price can not be an empty field.',
    'any.required': 'Price is a required field.',
  }),
  exp_date: Joi.string().required().messages({
    'string.base':
      'Expire date should be a type of string.',
    'string.empty':
      'Expire date can not be an empty field.',
    'any.required': 'Expire date is a required field.',
  }),
});
