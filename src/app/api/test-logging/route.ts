import { NextResponse } from 'next/server';
import { logger, createLogger } from '@/lib/logger';
import { flushLogs } from '@/lib/posthog-logging';

/**
 * Test endpoint for PostHog logging
 * GET /api/test-logging - Sends test logs to PostHog
 * 
 * NOTE: This endpoint is only available in development mode
 */
export async function GET() {
  // Block access in production
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This endpoint is only available in development mode' },
      { status: 403 }
    );
  }

  const testLogger = createLogger('test-logging');

  try {
    // Test different log levels
    logger.info('Test log from default logger', {
      endpoint: '/api/test-logging',
      timestamp: new Date().toISOString(),
    });

    testLogger.trace('Trace level test log', { level: 'trace' });
    testLogger.debug('Debug level test log', { level: 'debug' });
    testLogger.info('Info level test log', { level: 'info' });
    testLogger.warn('Warning level test log', { level: 'warn' });
    testLogger.error('Error level test log', { level: 'error' });

    // Force flush logs to ensure they are sent immediately
    await flushLogs();

    return NextResponse.json({
      success: true,
      message: 'Test logs sent to PostHog',
      logs_sent: [
        'trace: Trace level test log',
        'debug: Debug level test log',
        'info: Info level test log',
        'warn: Warning level test log',
        'error: Error level test log',
      ],
    });
  } catch (error) {
    logger.error('Failed to send test logs', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send test logs',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
