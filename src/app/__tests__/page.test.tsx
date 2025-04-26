/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { HomeMobile } from '@/features/mobile/home';
import { SessionProvider as _SessionProvider } from 'next-auth/react';

// Mock React
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    useLayoutEffect: originalReact.useEffect,
  };
});

// Mock next-auth
jest.mock('next-auth/react', () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useSession: () => ({ data: null, status: 'unauthenticated' }),
}));

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
  default: (props: React.ComponentProps<'img'>) => <img alt="" {...props} />,
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

const renderWithProviders = (ui: React.ReactElement) => {
  return render(ui);
};

describe('HomeMobile', () => {
  it('renders without crashing', () => {
    renderWithProviders(<HomeMobile />);
    // The actual component has a different structure
    expect(
      screen.getByText('Get Instant Cashback on every spend')
    ).toBeInTheDocument();
  });
});
