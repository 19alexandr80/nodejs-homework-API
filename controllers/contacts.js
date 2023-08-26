// const Joi = require("joi");

const contactsApi = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

// const contactSchema = Joi.object({
//   name: Joi.string()
//     .pattern(
//       new RegExp("^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"),
//       { name: "alpha" }
//     )
//     .required()
//     .messages({
//       "any.required": "missing required name field",
//       "string.pattern.name": "name not valid",
//     }),
//   email: Joi.string().email().required().messages({
//     "any.required": "missing required email field",
//     "string.email": "email must be a valid email :)",
//   }),
//   phone: Joi.string()
//     .pattern(/^[0-9: -/+]+$/, "numbers")
//     .required()
//     .messages({
//       "any.required": "missing required phone field",
//       "string.pattern.name": "phone numbers not valid",
//     }),
// });

const getAllContacts = async (_, res) => {
  const data = await contactsApi.listContacts();
  res.json(data);
};
const getContactById = async (req, res) => {
  const id = req.params.contactId;
  const data = await contactsApi.getContactById(id);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json(data);
};
const addContact = async (req, res) => {
  //   const { error } = contactSchema.validate(req.body);
  //   if (error) {
  //     throw HttpError(400, error.details[0].message);
  //   }
  const data = await contactsApi.addContact(req.body);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(data);
};
const deleteContactById = async (req, res) => {
  const id = req.params.contactId;
  const data = await contactsApi.removeContact(id);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "deleted contact",
  });
};
const changeContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, `mising required`);
  }
  // const { error } = contactSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, error.details[0].message);
  // }
  const id = req.params.contactId;
  const data = await contactsApi.updateContact(id, req.body);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(data);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContactById: ctrlWrapper(deleteContactById),
  changeContact: ctrlWrapper(changeContact),
};
