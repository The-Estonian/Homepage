import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import { vi } from 'vitest';

describe('Login tests', () => {
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
      json: async () => ({ status: 'fail' }),
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
});
