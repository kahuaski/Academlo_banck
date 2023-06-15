const express = require("express");
//controllers
const userController = require("../controllers/users.controllers");

const validationMiddleware = require("../middlewares/validation.middleware");

const router = express.Router();
router.post(
  "/signup",
  validationMiddleware.createUserValid,
  userController.signup
);

router.post(
  "/login",
  validationMiddleware.userLoginValid,
  userController.login
);

module.exports = router;
