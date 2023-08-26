const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateContact } = require("../../middlewares");
const schemas = require("../../schemas/schemContact");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateContact(schemas.contactSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.deleteContactById);

router.put(
  "/:contactId",
  validateContact(schemas.contactSchema),
  ctrl.changeContact
);

module.exports = router;
