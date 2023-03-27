import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders sign in to your account header elementw', () => {
  render(<App />);
  const headingElement = screen.getByText(/Sign in to your account/i);
  expect(headingElement).toBeInTheDocument();
});

/*fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(screen.getByTestId('toggle off')).toBeInTheDocument();
    });*/
