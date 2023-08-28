const contactsApi = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

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
