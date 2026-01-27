// Next.js instrumentation file
// This file is automatically loaded by Next.js when the server starts
// See: https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation

export async function register() {
  // Only run on server-side
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { initPostHogLogging } = await import('@/lib/posthog-logging');
    initPostHogLogging();
  }
}
