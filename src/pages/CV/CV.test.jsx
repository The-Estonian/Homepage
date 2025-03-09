import { render, screen, fireEvent, act } from '@testing-library/react';

import CV from './CV';
import { educationList } from '../../education/educationList';
import { skillList } from '../../education/skillList';

import image2 from '../../assets/images/Jaanus2.jpg';

vi.useFakeTimers();

describe('CV Component', () => {
  it('CV renders correctly', () => {
    render(<CV />);

    educationList.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.desc)).toBeInTheDocument();
    });

    skillList.forEach((each) => {
      expect(screen.getByText(each.skill)).toBeInTheDocument();
    });
  });

  it('Changes info on educationList when clicked', () => {
    render(<CV />);

    const firstItem = screen.getByText(educationList[0].name);
    expect(screen.queryByText(educationList[0].date)).not.toBeInTheDocument();
    expect(screen.getByText(educationList[0].duration)).toBeInTheDocument();

    fireEvent.click(firstItem);

    expect(
      screen.queryByText(educationList[0].duration)
    ).not.toBeInTheDocument();
    expect(screen.getByText(educationList[0].date)).toBeInTheDocument();
  });

  it('educationList module closes after second click', () => {
    render(<CV />);

    const firstItem = screen.getByText(educationList[0].name);
    fireEvent.click(firstItem);
    expect(screen.queryByText(educationList[0].date)).toBeInTheDocument();
    fireEvent.click(firstItem);
    expect(screen.queryByText(educationList[0].date)).not.toBeInTheDocument();
  });

  it('Test if images change every 5s', () => {
    render(<CV />);

    const imageElement = screen.getByAltText('profile image');
    expect(imageElement).toHaveAttribute('src', image2);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(imageElement).not.toHaveAttribute('src', image2);
  });
});
