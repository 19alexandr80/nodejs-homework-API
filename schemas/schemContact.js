const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .pattern(
      new RegExp("^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"),
      { name: "alpha" }
    )
    .required()
    .messages({
      "any.required": "missing required name field",
      "string.pattern.name": "name not valid",
    }),
  email: Joi.string().email().required().messages({
    "any.required": "missing required email field",
    "string.email": "email must be a valid email :)",
  }),
  phone: Joi.string()
    .pattern(/^[0-9: -/+]+$/, "numbers")
    .required()
    .messages({
      "any.required": "missing required phone field",
      "string.pattern.name": "phone numbers not valid",
    }),
  favorite: Joi.boolean(),
});

const favoriteSchem = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
  }),
});

module.exports = { contactSchema, favoriteSchem };
