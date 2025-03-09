import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import Contacts from './Contacts';

describe('Contacts tests', () => {
  beforeAll(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(),
      },
    });
  });

  it('Has correct contact information', () => {
    render(<Contacts />);
    expect(screen.getByText('Europe, Estonia, Tallinn')).toBeInTheDocument();
  });

  it('Has working links', () => {
    render(<Contacts />);

    const linkedinLink = screen.getByTestId('linkedin-link');
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/jaanus-saar-3897a721b/'
    );

    const githubLink = screen.getByTestId('github-link');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/The-Estonian'
    );
  });

  it('Copies name to clipboard when clicked', async () => {
    render(<Contacts />);

    const nameElement = screen.getByText('Jaanus Saar');
    fireEvent.click(nameElement);
    expect(screen.getByText('Copied to Clipboard')).toBeInTheDocument(
      'Jaanus Saar'
    );

    await waitFor(() => {
      expect(screen.getByText('Jaanus Saar')).toBeInTheDocument();
    });
  });
});
