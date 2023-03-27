import React from 'react';
import { render, screen } from '@testing-library/react';
import LogoHeader from '../components/LogoHeader';

describe('LogoHeader', () => {
  test('renders logo image', () => {
    render(<LogoHeader />);
    const logoImage = screen.getByAltText('Logo');
    expect(logoImage).toBeInTheDocument();
  });
});
