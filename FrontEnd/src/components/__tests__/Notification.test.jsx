import { render, screen, fireEvent } from '@testing-library/react';
import Notification from '../Notification';

describe('Notification', () => {
  test('renders notification when visible', () => {
    render(
      <Notification 
        type="success"
        message="Test message"
        isVisible={true}
        onClose={() => {}}
      />
    );
    
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  test('does not render when not visible', () => {
    render(
      <Notification 
        type="success"
        message="Test message"
        isVisible={false}
        onClose={() => {}}
      />
    );
    
    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    
    render(
      <Notification 
        type="info"
        message="Test message"
        isVisible={true}
        onClose={handleClose}
      />
    );
    
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('renders different types correctly', () => {
    const types = ['success', 'error', 'warning', 'info'];
    
    types.forEach(type => {
      const { rerender } = render(
        <Notification 
          type={type}
          message={`${type} message`}
          isVisible={true}
          onClose={() => {}}
        />
      );
      
      expect(screen.getByText(`${type} message`)).toBeInTheDocument();
      rerender(<></>);
    });
  });
});