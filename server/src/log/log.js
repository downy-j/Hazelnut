const { createLogger, transports, format } = require("winston");
const { combine, timestamp, printf, label, simple, colorize } = format;

const printFormat = printf(({ timestamp, label, level, message }) => {
  return `${timestamp} [ ${label} ] ${level} : ${message}`;
});

const printLoggFormat = {
  file: combine(
    label({
      label: "Hazelnuts - SNS Server",
    }),
    timestamp({
      format: "YY-MM-DD HH:mm:dd",
    }),
    printFormat
  ),
  console: combine(colorize(), simple()),
};

const opts = {
  file: new transports.File({
    filename: "access.log",
    dirname: "./logs",
    level: "info",
    format: printLoggFormat.file,
  }),
  console: new transports.Console({
    level: "info",
    format: printLoggFormat.console,
  }),
};

const logger = createLogger({
  transports: [opts.file],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(opts.console);
}

logger.stream = {
  write: (message) => logger.info(message),
};

module.exports = logger;
