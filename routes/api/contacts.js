const express = require("express");
const { validation, ctrlWrapper, auth } = require("../../middlewars");
const { addJoiSchema, patchJoiSchema, favoriteJoiSchema } = require("../../models");
const { contacts: ctrl } = require("../../controllers");
const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", auth, validation(addJoiSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.patch("/:contactId", validation(patchJoiSchema), ctrlWrapper(ctrl.updateContact));

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
