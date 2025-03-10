import { render, screen, fireEvent, act } from '@testing-library/react';

import Picture from './Picture';

describe('Picture component tests', () => {
  it('Shows spinner before img gets loaded', () => {
    render(<Picture img='test-image.jpg' />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();

    const image = screen.getByAltText('Project Image');
    fireEvent.load(image);
    expect(spinner).not.toBeInTheDocument();
  });
});
