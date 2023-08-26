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
      throw HttpError(400, error.details[0].message);
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
      throw HttpError(400, error.details[0].message);
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
