import { render, screen } from '@testing-library/react';
import Skills from './Skills';

test('renders skill text correctly', () => {
  render(<Skills item={{ skill: 'JavaScript' }} />);

  expect(screen.getByText('JavaScript')).toBeInTheDocument();
});
