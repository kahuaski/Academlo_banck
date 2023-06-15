const catchAsync = (funtion) => {
  return (req, res, next) => {
    funtion(req, res, next).catch(next);
  };
};

module.exports = catchAsync;
