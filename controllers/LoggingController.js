import winston from "winston";

class LoggingController {
  constructor() {
    this.logger = winston.createLogger({
      transports: [new winston.transports.Console()]
    });
  }

  error(error) {
    this.logger.error(`${error.name}||${error.message}||${error.stack}`);
  }
}

export default LoggingController;
