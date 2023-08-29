const Contact = require("../models/modelContacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAllContacts = async (_, res) => {
  const data = await Contact.find({}, "-createdAt -updatedAt");
  res.json(data);
};
const getContactById = async (req, res) => {
  const id = req.params.contactId;
  const data = await Contact.findById(id);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json(data);
};
const addContact = async (req, res) => {
  const data = await Contact.create(req.body);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(data);
};
const deleteContactById = async (req, res) => {
  const id = req.params.contactId;
  const data = await Contact.findByIdAndRemove(id);
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
  const data = await Contact.findByIdAndUpdate(id, req.body, { new: true });
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
