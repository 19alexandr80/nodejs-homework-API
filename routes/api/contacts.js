const express = require("express");

const ctrl = require("../../controllers/contacts");

const {
  validateContact,
  isValidId,
  validateFavorite,
} = require("../../middlewares");
const schemas = require("../../schemas/schemContact");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateContact(schemas.contactSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.deleteContactById);

router.patch(
  "/:contactId/favorite",
  validateFavorite(schemas.favoriteSchem),
  isValidId,
  ctrl.updatedFavorite
);

router.put(
  "/:contactId",
  isValidId,
  validateContact(schemas.contactSchema),
  ctrl.changeContact
);

module.exports = router;
