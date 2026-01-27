import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import {
  BatchLogRecordProcessor,
  LoggerProvider,
} from '@opentelemetry/sdk-logs';
import { logs } from '@opentelemetry/api-logs';
import { resourceFromAttributes } from '@opentelemetry/resources';

// PostHog logging endpoint
const POSTHOG_LOGS_URL = 'https://us.i.posthog.com/i/v1/logs';

let loggerProvider: LoggerProvider | null = null;
let isInitialized = false;

/**
 * Initialize the OpenTelemetry logging SDK for PostHog
 * This should be called once at application startup (server-side only)
 */
export function initPostHogLogging(apiKey?: string): void {
  // Only initialize on server-side
  if (typeof window !== 'undefined') {
    console.warn('PostHog logging should only be initialized server-side');
    return;
  }

  if (isInitialized) {
    return;
  }

  const posthogApiKey = apiKey || process.env.NEXT_PUBLIC_POSTHOG_KEY;

  if (!posthogApiKey) {
    console.warn(
      'PostHog API key not found. Logging will not be sent to PostHog.'
    );
    return;
  }

  try {
    const resource = resourceFromAttributes({
      'service.name': 'gogocash-web',
      'service.version': process.env.npm_package_version || '0.0.1',
      'deployment.environment': process.env.NODE_ENV || 'development',
    });

    const logExporter = new OTLPLogExporter({
      url: POSTHOG_LOGS_URL,
      headers: {
        Authorization: `Bearer ${posthogApiKey}`,
      },
    });

    const batchProcessor = new BatchLogRecordProcessor(logExporter, {
      maxExportBatchSize: 512,
      scheduledDelayMillis: 5000, // Flush every 5 seconds
      maxQueueSize: 2048,
    });

    // Create LoggerProvider with processors in config
    loggerProvider = new LoggerProvider({
      resource,
      processors: [batchProcessor],
    });

    // Register the LoggerProvider with the OpenTelemetry API
    logs.setGlobalLoggerProvider(loggerProvider);

    isInitialized = true;

    console.log('PostHog logging initialized successfully');

    // Send a test log to verify connection
    const testLogger = logs.getLogger('posthog-init');
    testLogger.emit({
      severityText: 'INFO',
      body: 'PostHog logging initialized',
      attributes: {
        'init.timestamp': new Date().toISOString(),
        'init.environment': process.env.NODE_ENV || 'development',
      },
    });
  } catch (error) {
    console.error('Failed to initialize PostHog logging:', error);
  }
}

/**
 * Get the logger provider instance
 */
export function getLoggerProvider(): LoggerProvider | null {
  return loggerProvider;
}

/**
 * Check if PostHog logging is initialized
 */
export function isPostHogLoggingInitialized(): boolean {
  return isInitialized;
}

/**
 * Force flush all pending logs
 */
export async function flushLogs(): Promise<void> {
  if (loggerProvider) {
    await loggerProvider.forceFlush();
  }
}
