const express = require("express");

const { validateContact, autenticate } = require("../../middlewares");
const schemas = require("../../schemas/schemContact");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post(
  "/register",
  validateContact(schemas.userRegistrSchema),
  ctrl.registerUser
);
router.post("/login", validateContact(schemas.userRegistrSchema), ctrl.login);

router.get("/current", autenticate, ctrl.current);

router.post("/logout", autenticate, ctrl.logout);

module.exports = router;
