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

  it('Copies data to clipboard when clicked', async () => {
    render(<Contacts />);

    const nameElement = screen.getByText('Jaanus Saar');
    const phoneElement = screen.getByText('+37258218417');
    const addressElement = screen.getByText('Europe, Estonia, Tallinn');
    const emailElement = screen.getByText('Zaar2213@gmail.com');

    fireEvent.click(nameElement);
    const findName = await screen.findByText('Copied to Clipboard');
    expect(findName).toBeInTheDocument();
    await waitFor(
      () => {
        expect(
          screen.queryByText('Copied to Clipboard')
        ).not.toBeInTheDocument();
      },
      { timeout: 1100 }
    );

    fireEvent.click(phoneElement);
    const findPhone = await screen.findByText('Copied to Clipboard');
    expect(findPhone).toBeInTheDocument();
    await waitFor(
      () => {
        expect(
          screen.queryByText('Copied to Clipboard')
        ).not.toBeInTheDocument();
      },
      { timeout: 1100 }
    );

    fireEvent.click(addressElement);
    const findAddress = await screen.findByText('Copied to Clipboard');
    expect(findAddress).toBeInTheDocument();
    await waitFor(
      () => {
        expect(
          screen.queryByText('Copied to Clipboard')
        ).not.toBeInTheDocument();
      },
      { timeout: 1100 }
    );

    fireEvent.click(emailElement);
    const findEmail = await screen.findByText('Copied to Clipboard');
    expect(findEmail).toBeInTheDocument();
    await waitFor(
      () => {
        expect(
          screen.queryByText('Copied to Clipboard')
        ).not.toBeInTheDocument();
      },
      { timeout: 1100 }
    );

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(4);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Jaanus Saar');
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        '+37258218417'
      );
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'Europe, Estonia, Tallinn'
      );
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'Zaar2213@gmail.com'
      );
    });
  });
});
