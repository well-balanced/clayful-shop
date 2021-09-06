import winston, { createLogger, format, config, transports } from 'winston'

const levels: config.AbstractConfigSetLevels = {
  error: 0,
  http: 0,
  warn: 1,
  info: 2,
  debug: 5,
}

const colors: config.AbstractConfigSetColors = {
  error: 'red',
  http: 'red',
  info: 'cyan',
  debug: 'magenta',
}

winston.addColors(colors)

interface CustomLevel extends winston.Logger {
  error: winston.LeveledLogMethod
  http: winston.LeveledLogMethod
  warn: winston.LeveledLogMethod
  info: winston.LeveledLogMethod
  debug: winston.LeveledLogMethod
}

const logger: CustomLevel = createLogger({
  levels,
  format: format.combine(
    format.label({ label: '[clayful-shop]' }),
    format.timestamp({
      format: 'YY-MM-DD HH:mm:ss',
    }),
    format.colorize(),
    format.printf(
      info =>
        `${info.timestamp} - ${info.level}: ${info.label} ${info.message}`,
    ),
  ),
  transports: [new transports.Console()],
}) as CustomLevel

export default logger
