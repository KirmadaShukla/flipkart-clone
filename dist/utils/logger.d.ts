export declare enum LogLevel {
    ERROR = "error",
    WARN = "warn",
    INFO = "info",
    DEBUG = "debug"
}
export declare class Logger {
    private static instance;
    private logLevel;
    private constructor();
    static getInstance(): Logger;
    setLogLevel(level: LogLevel): void;
    error(message: string, meta?: any): void;
    warn(message: string, meta?: any): void;
    info(message: string, meta?: any): void;
    debug(message: string, meta?: any): void;
    private shouldLog;
}
