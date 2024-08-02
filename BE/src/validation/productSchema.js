import Joi from 'joi';

const productSchema = Joi.object({
  title: Joi.string().min(6).max(255).required().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title cannot be empty",
    "string.min": "Title must have at least 6 characters",
    "string.max": "Title must have at most 255 characters",
  }),
  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.empty": "Price cannot be empty",
    "number.min": "Price minimum value is 0",
  }),
  thumbnail: Joi.string().required().messages({
    "string.base": "Thumbnail must be a string",
    "string.empty": "Thumbnail cannot be empty",
  }),
  description: Joi.string().allow('').optional().messages({
    "string.base": "Description must be a string",
  }),
  category: Joi.string().required().messages({
    "string.base": "Category must be a string",
    "string.empty": "Category cannot be empty",
  }),
});

export default productSchema;
