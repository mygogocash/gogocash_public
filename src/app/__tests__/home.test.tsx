/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Index from '../(page)/page';

// Mock the components used in the home page
jest.mock('@/features/desktop/home', () => ({
  __esModule: true,
  default: () => <div data-testid="desktop-home">Desktop Home Component</div>,
}));

jest.mock('@/features/mobile/home', () => ({
  HomeMobile: () => <div data-testid="mobile-home">Mobile Home Component</div>,
}));

jest.mock('@/features/mobile/intro', () => ({
  IntroMobile: ({ setIntro }: { setIntro: (value: boolean) => void }) => (
    <div data-testid="mobile-intro" onClick={() => setIntro(false)}>
      Mobile Intro Component
    </div>
  ),
}));

jest.mock('@/components/layouts', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout">{children}</div>
  ),
}));

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

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Home Page', () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  it('should render desktop home component on desktop view', async () => {
    // Mock window.matchMedia to simulate desktop
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query.includes('min-width: 768px'),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(<Index />);

    // Wait for client-side rendering and effects to complete
    await waitFor(() => {
      expect(screen.getByTestId('layout')).toBeInTheDocument();
    });

    expect(screen.getByTestId('desktop-home')).toBeInTheDocument();
  });

  it('should render intro component on first visit on mobile', async () => {
    // Mock window.matchMedia to simulate mobile
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: !query.includes('min-width: 768px'),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    // This simulates a first visit (intro not seen)
    window.localStorage.setItem('intro', 'false');

    render(<Index />);

    // Wait for client-side rendering and effects to complete
    await waitFor(() => {
      expect(screen.getByTestId('layout')).toBeInTheDocument();
    });

    expect(screen.getByTestId('mobile-intro')).toBeInTheDocument();
  });

  it('should render mobile home component on subsequent visits', async () => {
    // Mock window.matchMedia to simulate mobile
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: !query.includes('min-width: 768px'),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    // This simulates a return visit (intro already seen)
    window.localStorage.setItem('intro', 'true');

    render(<Index />);

    // Wait for client-side rendering and effects to complete
    await waitFor(() => {
      expect(screen.getByTestId('layout')).toBeInTheDocument();
    });

    expect(screen.getByTestId('mobile-home')).toBeInTheDocument();
  });
});
