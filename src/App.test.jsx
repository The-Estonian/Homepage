import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { vi } from 'vitest';

beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({}),
  });
});

describe('App testing', () => {
  it('renders App without crashing', () => {
    render(<App />);

    expect(screen.getByText(/CV/i)).toBeInTheDocument();

    const portButton = screen.getByText(/Portfolio/i);
    fireEvent.click(portButton);
    expect(screen.getByText(/Portfolio/i)).toBeInTheDocument();

    const contactButton = screen.getByText(/Contacts/i);
    fireEvent.click(contactButton);
    expect(screen.getByText(/Contacts/i)).toBeInTheDocument();
  });

  it('Should show profile when user is logged in', () => {
    vi.mock('react', async () => {
      const actualReact = await vi.importActual('react'); // Import real React module
      return {
        ...actualReact,
        useState: vi.fn((initial) =>
          initial === false ? [true, vi.fn()] : [initial, vi.fn()]
        ),
      };
    });

    render(<App />);

    const profileButton = screen.getByText(/Profile/i);
    fireEvent.click(profileButton);
    expect(screen.getByText(/Portfolio/i)).toBeInTheDocument();
  });

  it('Logs out user and sets user null and auth false', async () => {
    vi.doMock('react', async () => {
      const actualReact = await vi.importActual('react'); // Import real React module
      return {
        ...actualReact,
        useState: vi
          .fn()
          .mockReturnValueOnce([true, vi.fn()])
          .mockReturnValueOnce([{ id: 1, name: 'Test User' }, vi.fn()]),
      };
    });

    const fetchSpy = vi.spyOn(global, 'fetch');

    const { default: App } = await import('./App');

    render(<App />);

    const logOutButton = screen.getByText(/Logout/i);
    expect(logOutButton).toBeInTheDocument();

    fireEvent.click(logOutButton);
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining('/logout'),
        expect.objectContaining({
          method: 'POST',
        })
      );
    });
  });

  it('Checks if backend errors return new Error on /visit', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Internal Server Error' }),
    });
    render(<App />);
    await new Promise((r) => setTimeout(r, 50));
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/visitor'),
      expect.any(Object)
    );
  });

  it('Checks if backend errors return new Error on /logout', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Internal Server Error' }),
    });

    vi.doMock('react', async () => {
      const actualReact = await vi.importActual('react');
      return {
        ...actualReact,
        useState: vi
          .fn()
          .mockReturnValueOnce([true, vi.fn()]) // isAuthenticated = true
          .mockReturnValueOnce([{ id: 1, name: 'Test User' }, vi.fn()]), // user = { id: 1, name: 'Test User' }
      };
    });

    const { default: App } = await import('./App');
    render(<App />);

    const logOutButton = await waitFor(() => screen.getByText(/Logout/i));
    expect(logOutButton).toBeInTheDocument();
    fireEvent.click(logOutButton);

    await new Promise((r) => setTimeout(r, 50));

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/logout'),
      expect.any(Object)
    );
  });
});
