import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RootContainer from './RootContainer';
import { vi } from 'vitest';

global.fetch = vi.fn();
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

describe('RootContainer tests', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Should be able to call backend /status successfully', async () => {
    const setAuth = vi.fn();
    const setUser = vi.fn();
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: 'success', user: { name: 'asd' } }),
    });

    render(
      <MemoryRouter>
        <RootContainer
          user='asd'
          setIsAuthenticated={setAuth}
          setUser={setUser}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(setAuth).toHaveBeenCalledTimes(1);
      expect(setUser).toHaveBeenCalledTimes(1);
      expect(setUser).toHaveBeenCalledWith({
        status: 'success',
        user: { name: 'asd' },
      });
    });
  });

  it('Should reidrect to /login on bad /status check or error', async () => {
    const setAuth = vi.fn();
    const setUser = vi.fn();
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: 'fail' }),
    });

    render(
      <MemoryRouter initialEntries={['/profile']}>
        <RootContainer
          user='asd'
          isAuthenticated={true}
          setIsAuthenticated={setAuth}
          setUser={setUser}
        />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(setUser).toHaveBeenCalledTimes(1);
      expect(setUser).toHaveBeenCalledWith(null);
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  it('handleLogout should be called', async () => {
    const logOutHandler = vi.fn();
    const setAuth = vi.fn();
    const setUser = vi.fn();
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: 'success', user: { name: 'asd' } }),
    });

    const { rerender } = render(
      <MemoryRouter>
        <RootContainer
          user='asd'
          isAuthenticated={true}
          logOutHandler={logOutHandler}
          setIsAuthenticated={setAuth}
          setUser={setUser}
        />
      </MemoryRouter>
    );

    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);

    expect(logOutHandler).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('Should redirect to /login on fetch failure', async () => {
    const setAuth = vi.fn();
    const setUser = vi.fn();

    global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network Error'));

    render(
      <MemoryRouter initialEntries={['/profile']}>
        <RootContainer
          user='asd'
          isAuthenticated={true}
          setIsAuthenticated={setAuth}
          setUser={setUser}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  it('Should return if response is not ok', async () => {
    const setAuth = vi.fn();
    const setUser = vi.fn();
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({ status: 'fail' }),
    });

    render(
      <MemoryRouter initialEntries={['/profile']}>
        <RootContainer
          user='asd'
          isAuthenticated={true}
          setIsAuthenticated={setAuth}
          setUser={setUser}
        />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
