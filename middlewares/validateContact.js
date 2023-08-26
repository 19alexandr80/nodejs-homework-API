const { HttpError } = require("../helpers");

const validateContact = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.details[0].message));
    }
    next();
  };
  return func;
};

module.exports = validateContact;
