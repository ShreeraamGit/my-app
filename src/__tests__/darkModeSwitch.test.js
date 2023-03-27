import DarkLightModeSwitch from '../components/DarkLightModeSwitch';
import { DarkLightModeContext } from '../context/darkLightMode';
import { render, screen, fireEvent } from '@testing-library/react';

describe('DarkLightModeSwitcher', () => {
  it('toggles between light and dark mode', async () => {
    const setDarkMode = jest.fn();
    const setStyle = jest.fn();
    const darkMode = false;
    const style = { bgcolor: '#FFFFFF' };
    render(
      <DarkLightModeContext.Provider
        value={{ darkMode, setDarkMode, style, setStyle }}
      >
        <DarkLightModeSwitch />
      </DarkLightModeContext.Provider>,
    );
    const toggleButton = screen.getByRole('button', {
      name: /switch/i,
    });
    const toggleButtonOn = screen.getByTestId('toggle on');

    expect(toggleButton).toBeInTheDocument();
    expect(toggleButtonOn).toBeInTheDocument();

    // dark mode changed
    const mockOnClick = jest.fn();
    render(<button onClick={mockOnClick()} />);
    const toggleButtonOff = screen.getByTestId('toggle on');
    fireEvent.click(toggleButtonOff);
    expect(toggleButtonOff).toBeInTheDocument();
    expect(mockOnClick).toHaveBeenCalledTimes(1);

    //again changed to light mode
    fireEvent.click(toggleButtonOn);
    expect(toggleButtonOn).toBeInTheDocument();
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
