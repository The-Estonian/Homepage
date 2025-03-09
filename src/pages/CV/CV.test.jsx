import { render, screen, fireEvent } from '@testing-library/react';

import CV from './CV';
import { educationList } from '../../education/educationList';
import { skillList } from '../../education/skillList';

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
});
