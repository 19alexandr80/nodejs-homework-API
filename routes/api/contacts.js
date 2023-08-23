const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const Joi = require("joi");

const contactsApi = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string()
    .pattern(
      new RegExp("^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$")
    )
    .required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const data = await contactsApi.listContacts();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const data = await contactsApi.getContactById(id);
    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      console.log(error.details[0].path[0]);
      throw HttpError(400, `mising required ${error.details[0].path[0]} field`);
    }
    const data = await contactsApi.addContact(req.body);
    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const data = await contactsApi.removeContact(id);
    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({
      message: "deleted contact",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, `mising required`);
    }
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, `mising required ${error.details[0].path[0]} field`);
    }
    const id = req.params.contactId;
    const data = await contactsApi.updateContact(id, req.body);
    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
