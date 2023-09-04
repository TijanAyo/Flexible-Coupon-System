import winston from 'winston';

interface errorLevels {
    error: string;
    warn: string;
    info: string;
}

interface loggerLevels {
    error: any;
    warn: any;
    info: any;
}

export const LOG_CONSOLE: winston.Logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

const levels: errorLevels = {
    error: 'error',
    warn: 'warn',
    info: 'info',
};

export const logger: loggerLevels = {
    error: (message: string) => LOG_CONSOLE.log({ level: levels.error, message }),
    warn: (message: string) => LOG_CONSOLE.log({ level: levels.warn, message }),
    info: (message: string) => LOG_CONSOLE.log({ level: levels.info, message }),
};
