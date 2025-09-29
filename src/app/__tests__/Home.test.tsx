import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../page'
import userEvent from '@testing-library/user-event';
import { EventsProvider } from '@/utils/context/EventsContext';

const renderComponent = () => {
    const user = userEvent.setup();
    const result = render(
        <EventsProvider>
            <Home />
        </EventsProvider>
)
    return { result, user }
  }

  describe('Home', () => {
    test('should render', () => {
      renderComponent();
      expect(screen.getByText('Type at least 3 characters to search venues. Use arrow keys to navigate results.')).toBeInTheDocument();
    });
  });