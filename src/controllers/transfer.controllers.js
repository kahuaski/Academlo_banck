const Transfer = require("../models/transfer.model");
const User = require("../models/users.modules");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const transfer = require("../models/transfer.model");

exports.transfer = catchAsync(async (req, res, next) => {
  const { amount, senderUserId, receiverUserId } = req.body;

  await transfer.create({
    amount,
    senderUserId,
    receiverUserId,
  });

  if (senderUserId === receiverUserId) {
    return next(
      new AppError(
        `Id of the sender user and id of the receiver user cannot be the same`,
        400
      )
    );
  }

  const receiverUser = await User.findOne({
    where: {
      status: "activated",
      id: receiverUserId,
    },
  });

  if (!receiverUser) {
    return next(
      new AppError(`User with id:${receiverUserId} was not found`, 404)
    );
  }

  const senderUser = await User.findOne({
    where: {
      status: "activated",
      id: senderUserId,
    },
  });

  if (!senderUser) {
    return next(
      new AppError(`User with id:${senderUserId} was not found`, 404)
    );
  }

  if (amount > senderUser.amount) {
    return next(
      new AppError(
        `User with id:${senderUserId} do not have enough money to make the transfer`,
        400
      )
    );
  }

  await receiverUser.update({ amount: receiverUser.amount + amount });

  await senderUser.update({ amount: senderUser.amount - amount });

  return res.status(200).json({
    status: "success",
    message: "Successful transfer",
    transfer,
  });

});

