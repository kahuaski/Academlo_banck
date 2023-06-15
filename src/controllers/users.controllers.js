const User = require("../models/users.modules");

const catchAsync = require("../utils/catchAsync");

const AppError = require("./../utils/appError");

exports.signup = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;
  const ramdonNumber = Math.floor(Math.random() * 900000) + 100000;

  const user = await User.create({
    name: name.toLowerCase(),
    accountNumber: ramdonNumber,
    password,
  });

  res.status(200).json({
    status: "success",
    message: "The user has been created",
    user: {
      id: user.id,
      name: user.name,
      accountNumber: user.accountNumber,
      amount: user.amount,
    },
  });
});
exports.login = catchAsync(async (req, res, next) => {
  const { accountNumber, password } = req.body;
  const user = await User.findOne({
    where: {
      accountNumber,
      status: "activated",
    },
  });

  if (!user) {
    return next(new AppError(`Account Numbre ${accountNumber} not found`, 404));
  }

  res.status(200).json({
    status: "success",
    user: {
      id: user.id,
      name: user.name,
      accountNumber: user.accountNumber,
      amount: user.amount,
    },
  });
});
exports.login = catchAsync(async (req, res, next) => {
  const { accountNumber, password } = req.body;
  const user = await User.findOne({
    where: {
      accountNumber,
      status: "activated",
    },
  });

  if (!user) {
    res.status(404).json({
      message: ` cannot Account  number:${accountNumber} not  found❗`,
    });
    return next(
      new AppError(` cannot Account  number${accountNumber} not  found`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    user: {
      id: user.id,
      name: user.name,
      accountNumber: user.accountNumber,
      amount: user.amount,
    },
  });
});
