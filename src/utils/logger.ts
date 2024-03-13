import { resolve } from 'path';
import { createLogger, format, transports } from 'winston'

export default createLogger({
  transports:
    new transports.File({
      filename: resolve('./dist/logs/server.log'),
      format: format.combine(
        format.timestamp({format: 'DD-MMMM-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
      )
    })
});