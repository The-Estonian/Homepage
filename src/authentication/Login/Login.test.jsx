import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Login from './Login';
import { vi } from 'vitest';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Login/Registration tests', () => {
  let mockNavigate, mockLogOutHandler;

  beforeEach(() => {
    global.fetch = vi.fn();
    mockNavigate = vi.fn();
    mockLogOutHandler = vi.fn();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Renders login', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const findLogin = screen.queryByText('Click here to Register account!');
    expect(findLogin).toBeInTheDocument();
  });

  it('Renders registration', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const findLogin = screen.queryByText('Click here to Register account!');
    fireEvent.click(findLogin);
    const findRegistration = screen.queryByText('Login to your account!');
    expect(findRegistration).toBeInTheDocument();
  });

  it('Fails backend request', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation();
    global.fetch = vi.fn().mockResolvedValueOnce({ ok: false });
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Backend not online');
    });
  });

  it('Succeeds backend request', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation();
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ping: 'pong' }),
    });
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Got pong!');
    });
  });

  it('Handles backend request crash', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation();
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error pinging backend:',
        expect.any(Error)
      );
    });
  });

  it('Sends login information to backend', async () => {
    const logOutHandler = vi.fn();
    const mockSetIsAuthenticated = vi.fn();
    const mockSetUser = vi.fn();

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ login: 'success', id: 1, name: 'Test User' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ login: 'success', id: 1, name: 'Test User' }),
      });

    render(
      <MemoryRouter>
        <Login
          setIsAuthenticated={mockSetIsAuthenticated}
          setUser={mockSetUser}
          logOutHandler={logOutHandler}
        />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/login'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'password123',
          }),
        })
      );
    });
    expect(mockSetIsAuthenticated).toHaveBeenCalledWith(true);
    expect(mockSetUser).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, name: 'Test User' })
    );
  });

  it('Error check on /alive /login', async () => {
    const logOutHandler = vi.fn();

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = vi
      .fn()
      .mockRejectedValueOnce(new Error('Network error'))
      .mockRejectedValueOnce(new Error('Network error'));

    render(
      <MemoryRouter>
        <Login logOutHandler={logOutHandler} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(logOutHandler).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('Error:', expect.any(Error));
    });
  });
});
