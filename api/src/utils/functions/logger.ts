import { createLogger, format, transports } from 'winston';

const dateToString = () => {
  const offset = new Date().getTimezoneOffset();
  const yourDate = new Date(new Date().getTime() + offset * 60 * 1000);
  return yourDate.toISOString().split('T')[0];
};

export default createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.json()
  ),
  transports: [
    new transports.File({
      maxsize: 5120000,
      filename: `${__dirname}/../../logs/log-api-${dateToString()}.log`,
    }),
    new transports.Console({ level: "debug" }),
  ],
});
