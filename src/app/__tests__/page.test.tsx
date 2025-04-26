/**
 * @jest-environment jsdom
 */

import { render, waitFor } from '@testing-library/react';
import { HomeMobile } from '@/features/mobile/home';
import { SessionProvider } from 'next-auth/react';

// Mock all external dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock('@/hooks/useCountdown', () => ({
  __esModule: true,
  default: () => ({
    formatTime: {
      hours: '00',
      minutes: '00',
      seconds: '00',
      days: '00',
    },
  }),
}));

const renderWithProviders = async (ui: React.ReactElement) => {
  const rendered = render(
    <SessionProvider session={null}>{ui}</SessionProvider>
  );
  await waitFor(() => {
    expect(rendered.container).toBeTruthy();
  });
  return rendered;
};

describe('HomeMobile', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(<HomeMobile />);
  });
});
