import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Index from '../(page)/page';

jest.mock('@/features/desktop/home', () => ({
  __esModule: true,
  default: () => <div data-testid="desktop-home">Desktop Home Component</div>,
}));

jest.mock('@/features/mobile/home', () => ({
  __esModule: true,
  HomeMobile: () => <div data-testid="mobile-home">Mobile Home Component</div>,
}));

jest.mock('@/features/mobile/intro', () => ({
  __esModule: true,
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

jest.mock('@/providers/HomeContext', () => ({
  HomeContext: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="home-context">{children}</div>
  ),
}));

describe('Index Page', () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  it('should render desktop home component on desktop view', async () => {
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

    await waitFor(() => {
      expect(screen.getByTestId('layout')).toBeInTheDocument();
    });

    expect(screen.getByTestId('desktop-home')).toBeInTheDocument();
  });

  it('should render intro component on first visit on mobile', async () => {
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

    window.localStorage.setItem('intro', 'false');

    render(<Index />);

    await waitFor(() => {
      expect(screen.getByTestId('layout')).toBeInTheDocument();
    });

    expect(screen.getByTestId('mobile-intro')).toBeInTheDocument();
  });

  it('should render mobile home component on subsequent visits', async () => {
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

    window.localStorage.setItem('intro', 'true');

    render(<Index />);

    await waitFor(() => {
      expect(screen.getByTestId('layout')).toBeInTheDocument();
    });

    expect(screen.getByTestId('mobile-home')).toBeInTheDocument();
  });
});
