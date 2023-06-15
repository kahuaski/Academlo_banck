const { body, validationResult } = require("express-validator");

const validItems = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      errors: errors.mapped(),
    });
  }
  next();
};
exports.createUserValid = [
  body("name").notEmpty().withMessage("Name cannot be empty"),
  body("password")
    .notEmpty()
    .withMessage("password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("password must  have a min od 8 characters"),
  validItems,
];
exports.userLoginValid = [
  body("accountNumber")
    .notEmpty()
    .withMessage("cannot be empty ")
    .isLength({ min: 6, max: 6 })
    .withMessage("must be 6 digits please"),
  body("password")
    .notEmpty()
    .withMessage("password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("password must  have a min od 8 characters"),
  validItems,
];
exports.transferValidation = [
  body("amount")
    .notEmpty()
    .withMessage("Amount cannot be empty")
    .isInt({ min: 1 })
    .withMessage("Amount must be a positive integer"),
  body("senderUserId")
    .notEmpty()
    .withMessage("User Id cannot be empty")
    .isInt({ min: 1 })
    .withMessage("Amount must be a positive integer"),
  body("receiverUserId")
    .notEmpty()
    .withMessage("User Id cannot be empty")
    .isInt({ min: 1 })
    .withMessage("Amount must be a positive integer"),
  validItems,
];
