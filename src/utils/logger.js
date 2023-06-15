const { createLogger, format, transport } = require("winston");
module.exports = createLogger({
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf(
      (info) =>
        `[${info.timestamp}] ${info.level} ${info.message} ${info.file}:${info.line}`
    )
  ),
  transports: [
    new transport.File({
      maxsize: 5120000,
      maxFiles: 5,
      filename: `${__dirname}/../logs/log-api.log`,
    }),
    new transport.Console({
      level: "debug",
    }),
  ],
});
