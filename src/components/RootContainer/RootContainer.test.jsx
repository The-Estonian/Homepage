import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RootContainer from './RootContainer';
import { vi } from 'vitest';

global.fetch = vi.fn();

describe('RootContainer tests', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Should render', () => {
    render(
      <MemoryRouter>
        <RootContainer />
      </MemoryRouter>
    );
  });

  it('Should be able to call backend /status', async () => {
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
});
