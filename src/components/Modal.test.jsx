import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';
import { vi } from 'vitest';

describe('Modal Component', () => {
  it('should not render when project is not open', () => {
    const handleClose = vi.fn();

    const { rerender } = render(
      <>{false && <Modal handleCloseSelectedProject={handleClose} />}</>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    rerender(<Modal handleCloseSelectedProject={handleClose} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should call handleCloseSelectedProject when clicked', () => {
    const handleCloseMock = vi.fn();
    render(<Modal handleCloseSelectedProject={handleCloseMock} />);

    const modalElement = screen.getByRole('dialog', { hidden: true });

    fireEvent.click(modalElement);

    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });
});
