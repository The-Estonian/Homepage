import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavigationHeader from './NavigationHeader';

describe('NavigationHeader tests', () => {
  it('Should render', () => {
    render(
      <MemoryRouter>
        <NavigationHeader />
      </MemoryRouter>
    );

    expect(screen.queryByText('CV')).toBeInTheDocument();
  });

  it('Should log user out on logout click', () => {
    const logoutHandler = vi.fn();
    render(
      <MemoryRouter>
        <NavigationHeader
          isAuthenticated='true'
          logOutHandler={logoutHandler}
        />
      </MemoryRouter>
    );

    const logoutButton = screen.queryByText('Logout');
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    fireEvent.click(logoutButton);

    expect(logoutHandler).toHaveBeenCalledTimes(1);
  });
});
