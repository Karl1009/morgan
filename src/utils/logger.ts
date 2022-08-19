import winston from 'winston';
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });
  
export type logLevel = 'info' | 'debug' | 'error' | 'alert'

const opts = {
  filename: 'logs/log-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  maxSize: '20m',
  maxFiles: '14d'
}

const logger = winston.createLogger({
  levels: {
    alert: 0,
    error: 1,
    debug: 2,
    info: 3
  },
// level: 'info',
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.Console(),
    // new DailyRotateFile(opts),
  ],
})

export { logger }