import { logs, SeverityNumber, type AnyValue } from '@opentelemetry/api-logs';
import { initPostHogLogging, isPostHogLoggingInitialized } from './posthog-logging';

// Ensure logging is initialized
if (typeof window === 'undefined' && !isPostHogLoggingInitialized()) {
  initPostHogLogging();
}

type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

interface LogAttributes {
  [key: string]: string | number | boolean | string[] | number[];
}

const severityMap: Record<LogLevel, { text: string; number: SeverityNumber }> = {
  trace: { text: 'TRACE', number: SeverityNumber.TRACE },
  debug: { text: 'DEBUG', number: SeverityNumber.DEBUG },
  info: { text: 'INFO', number: SeverityNumber.INFO },
  warn: { text: 'WARN', number: SeverityNumber.WARN },
  error: { text: 'ERROR', number: SeverityNumber.ERROR },
  fatal: { text: 'FATAL', number: SeverityNumber.FATAL },
};

/**
 * PostHog Logger utility class
 * Provides structured logging that sends logs to PostHog via OpenTelemetry
 */
class PostHogLogger {
  private loggerName: string;

  constructor(name: string = 'gogocash') {
    this.loggerName = name;
  }

  private log(level: LogLevel, message: string, attributes?: LogAttributes): void {
    // Always log to console
    const consoleMethod = level === 'fatal' ? 'error' : level;
    console[consoleMethod as 'log'](`[${level.toUpperCase()}]`, message, attributes || '');

    // Only send to PostHog on server-side
    if (typeof window !== 'undefined') {
      return;
    }

    try {
      const logger = logs.getLogger(this.loggerName);
      const severity = severityMap[level];

      logger.emit({
        severityNumber: severity.number,
        severityText: severity.text,
        body: message,
        attributes: attributes as Record<string, AnyValue>,
      });
    } catch (error) {
      console.error('Failed to emit log to PostHog:', error);
    }
  }

  trace(message: string, attributes?: LogAttributes): void {
    this.log('trace', message, attributes);
  }

  debug(message: string, attributes?: LogAttributes): void {
    this.log('debug', message, attributes);
  }

  info(message: string, attributes?: LogAttributes): void {
    this.log('info', message, attributes);
  }

  warn(message: string, attributes?: LogAttributes): void {
    this.log('warn', message, attributes);
  }

  error(message: string, attributes?: LogAttributes): void {
    this.log('error', message, attributes);
  }

  fatal(message: string, attributes?: LogAttributes): void {
    this.log('fatal', message, attributes);
  }
}

// Default logger instance
export const logger = new PostHogLogger('gogocash');

// Factory function to create named loggers
export function createLogger(name: string): PostHogLogger {
  return new PostHogLogger(name);
}

export default logger;
