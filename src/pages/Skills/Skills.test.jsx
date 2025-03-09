import { render, screen } from '@testing-library/react';
import Skills from './Skills';

describe('Skill render tests', () => {
  it('renders skill text correctly', () => {
    render(<Skills item={{ skill: 'JavaScript' }} />);

    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });
});
