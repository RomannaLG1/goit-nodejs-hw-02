const express = require("express");
const { validation, ctrlWrapper, auth } = require("../../middlewars");
const { auth: ctrl } = require("../../controllers");
const { authJoiSchema, updateSubscribeSchema } = require("../../models");
const router = express.Router();
const validationMiddleware = validation(authJoiSchema);

router.post("/register", validationMiddleware, ctrlWrapper(ctrl.register));
router.post("/login", validationMiddleware, ctrlWrapper(ctrl.login));
router.post("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch("/", auth, validation(updateSubscribeSchema), ctrlWrapper(ctrl.updateSubscribe));
module.exports = router;
