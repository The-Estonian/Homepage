import { render, screen } from '@testing-library/react';

import Profile from './Profile';

describe('Profile tests', () => {
  it('Tests if Profile renders', async () => {
    const testProfile = {
      profile: {
        id: 1,
        firstName: 'firstTest',
        lastName: 'lastTest',
        email: 'testEmail',
      },
      visitorData: {
        totalVisits: 1,
        lastVisit: 'yesterday',
      },
    };
    render(<Profile user={testProfile} />);

    const getFirstName = screen.queryByText(/firstTest/);
    const getLastName = screen.queryByText(/lastTest/);
    const getEmail = screen.queryByText(/testEmail/);
    const visitCount = screen.queryByText('Visit Count: 1');
    const lastVisit = screen.queryByText(/yesterday/);

    expect(getFirstName).toBeInTheDocument();
    expect(getLastName).toBeInTheDocument();
    expect(getEmail).toBeInTheDocument();
    expect(visitCount).toBeInTheDocument();
    expect(lastVisit).toBeInTheDocument();
  });

  it('Tests if Profile renders without user data', () => {
    render(<Profile user={null} />);

    expect(screen.queryByText(/User ID:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/First name:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Last name:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Email:/)).not.toBeInTheDocument();

    expect(screen.getByText('No user data to display!')).toBeInTheDocument();
  });
});
