const express = require("express");
const transferController = require("../controllers/transfer.controllers");

const validMiddleware = require("../middlewares/validation.middleware");

const router = express.Router();

router.post(
  "/",
  validMiddleware.transferValidation,
  transferController.transfer
);

module.exports = router;
