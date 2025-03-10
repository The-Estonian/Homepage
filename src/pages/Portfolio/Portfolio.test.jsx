import { render, screen, fireEvent, act } from '@testing-library/react';

import { projectList } from '../../projectList/projectList';
import Portfolio from './Portfolio';

describe('Portfolio component tests', () => {
  it('Renders correctly', () => {
    render(<Portfolio />);
    const firstItem = screen.getAllByAltText('Project Image')[0];
    fireEvent.click(firstItem);
    expect(
      screen.queryByText(projectList[0].frameworks[0])
    ).toBeInTheDocument();
    expect(screen.queryByText(projectList[0].languages[0])).toBeInTheDocument();
    expect(screen.queryByText(projectList[0].database[0])).toBeInTheDocument();
  });

  it('Closes correctly after opening', () => {
    render(<Portfolio />);
    const firstItem = screen.getAllByAltText('Project Image')[0];
    fireEvent.click(firstItem);
    expect(
      screen.queryByText(projectList[0].frameworks[0])
    ).toBeInTheDocument();

    const selectClose = screen.getByText('Close');
    fireEvent.click(selectClose);
    expect(
      screen.queryByText(projectList[0].frameworks[0])
    ).not.toBeInTheDocument();
  });

  it('Closes project when clicking outside the modal', () => {
    render(<Portfolio />);

    const firstItem = screen.getAllByAltText('Project Image')[0];
    fireEvent.click(firstItem);

    const modalBackground = screen.getByRole('dialog');
    fireEvent.click(modalBackground);

    expect(
      screen.queryByText(projectList[0].frameworks[0])
    ).not.toBeInTheDocument();
  });
});
