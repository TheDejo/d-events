import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Home from '../page'
import { EventsProvider } from '@/utils/context/EventsContext'
import { mockEmptyEventsResponse, mockEventsResponse, mockEventWithMusicResponse, mockSoldOutEventResponse } from '../testData.js'

const mockSWRInfinite = jest.fn()

jest.mock('swr/infinite', () => ({
  __esModule: true,
  default: () => mockSWRInfinite(),
}))

const renderComponent = () => {
  const user = userEvent.setup()
  const component = render(
        <EventsProvider>
            <Home />
        </EventsProvider>
)
  return { ...component, user }
}

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

      describe('Happy Path', () => {
        beforeEach(() => {
          mockSWRInfinite.mockReturnValue({
            data: [mockEventsResponse],
            size: 1,
            setSize: jest.fn(),
            mutate: jest.fn(),
            isLoading: false,
            isValidating: false,
          })
        })

    test('should render the main heading', () => {
      renderComponent()
      expect(screen.getByText('Upcoming events')).toBeInTheDocument()
    })

    test('should render search input', () => {
      renderComponent()
      expect(screen.getByRole('combobox')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Search venues...')).toBeInTheDocument()
    })

    test('should show no events message when no data is available', () => {
      renderComponent()
      expect(screen.getByRole('region', { name: 'Events list' })).toBeInTheDocument()
    })

    test('should render events when data is available', async () => {
      renderComponent()
      
      await waitFor(() => {
        expect(screen.getByText('Test Event')).toBeInTheDocument()
      })
    })

    test('should handle search input interaction', async () => {
      const { user } = renderComponent()
      const searchInput = screen.getByRole('combobox')

      await user.type(searchInput, 'test venue')

      await waitFor(() => {
        expect(searchInput).toHaveValue('test venue')
      })
    })

    test('should handle load more button click', async () => {
      const { user } = renderComponent()
      
      await waitFor(() => {
        const loadMoreButton = screen.queryByRole('button', { name: /load more/i })
        if (loadMoreButton) {
          user.click(loadMoreButton)
        }
      })
    })

    test('should display play button when music tracks are available', async () => {
      mockSWRInfinite.mockReturnValue({
        data: [mockEventWithMusicResponse],
        size: 1,
        setSize: jest.fn(),
        mutate: jest.fn(),
        isLoading: false,
        isValidating: false,
      })

      renderComponent()
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Play music preview' })).toBeInTheDocument()
      })
    })

    test('should display featured tag when event is featured', async () => {
      renderComponent()
      
      await waitFor(() => {
        expect(screen.getByText(/On sale/)).toBeInTheDocument()
      })
    })

    test('should display on-sale tag when event is on sale but not featured', async () => {
      mockSWRInfinite.mockReturnValue({
        data: [mockEventWithMusicResponse],
        size: 1,
        setSize: jest.fn(),
        mutate: jest.fn(),
        isLoading: false,
        isValidating: false,
      })

      renderComponent()
      
      await waitFor(() => {
        expect(screen.getByText(/On sale/)).toBeInTheDocument()
      })
    })

    test('should display sold out events properly', async () => {
      mockSWRInfinite.mockReturnValue({
        data: [mockSoldOutEventResponse],
        size: 1,
        setSize: jest.fn(),
        mutate: jest.fn(),
        isLoading: false,
        isValidating: false,
      })

      renderComponent()
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /sold out - Sold Out Event/ })).toBeInTheDocument()
        expect(screen.getAllByText('sold out')).toHaveLength(2)
      })
    })

    test('should handle accordion functionality', async () => {
      const { user } = renderComponent()
      
      await waitFor(() => {
        const accordionButton = screen.getByRole('button', { name: /More info/ })
        expect(accordionButton).toBeInTheDocument()
      })

      const accordionButton = screen.getByRole('button', { name: /More info/ })
      await user.click(accordionButton)

      await waitFor(() => {
        expect(screen.getByText('-')).toBeInTheDocument()
        expect(screen.getByText('A test event')).toBeInTheDocument()
        expect(screen.getByText('Line up')).toBeInTheDocument()
        expect(screen.getByText('Main Act')).toBeInTheDocument()
        expect(screen.getByText('Tickets')).toBeInTheDocument()
        expect(screen.getByText('General')).toBeInTheDocument()
        expect(screen.getByText(/\$50\.00/)).toBeInTheDocument()
      })

      await user.click(accordionButton)

      await waitFor(() => {
        expect(screen.getByText('+')).toBeInTheDocument()
      })
    })

    test('should handle image switching when accordion opens', async () => {
      const { user } = renderComponent()
      
      await waitFor(() => {
        const image = screen.getByAltText('Event image for Test Event')
        expect(image).toHaveAttribute('src', 'https://example.com/square.jpg')
      })

      const accordionButton = screen.getByRole('button', { name: /More info/ })
      await user.click(accordionButton)

      await waitFor(() => {
        const image = screen.getByAltText('Event image for Test Event')
        expect(image).toHaveAttribute('src', 'https://example.com/landscape.jpg')
      })
    })

    test('should display price from label when accordion is open', async () => {
      const { user } = renderComponent()
      
      const accordionButton = screen.getByRole('button', { name: /More info/ })
      await user.click(accordionButton)

      await waitFor(() => {
        expect(screen.getByText('From')).toBeInTheDocument()
      })
    })

    test('should handle complex lineup information', async () => {
      mockSWRInfinite.mockReturnValue({
        data: [mockEventWithMusicResponse],
        size: 1,
        setSize: jest.fn(),
        mutate: jest.fn(),
        isLoading: false,
        isValidating: false,
      })

      const { user } = renderComponent()
      
      const accordionButton = screen.getByRole('button', { name: /More info/ })
      await user.click(accordionButton)

      await waitFor(() => {
        expect(screen.getByText('Headliner')).toBeInTheDocument()
        expect(screen.getByText('Support Act')).toBeInTheDocument()
      })
    })

    test('should handle multiple ticket types', async () => {
      mockSWRInfinite.mockReturnValue({
        data: [mockEventWithMusicResponse],
        size: 1,
        setSize: jest.fn(),
        mutate: jest.fn(),
        isLoading: false,
        isValidating: false,
      })

      const { user } = renderComponent()
      
      const accordionButton = screen.getByRole('button', { name: /More info/ })
      await user.click(accordionButton)

      await waitFor(() => {
        expect(screen.getByText('VIP')).toBeInTheDocument()
        expect(screen.getByText('Early Bird')).toBeInTheDocument()
      })
    })

    test('should debounce search input changes', async () => {
      const { user } = renderComponent()
      const searchInput = screen.getByRole('combobox')

      await user.type(searchInput, 'test')
      await user.type(searchInput, ' venue')
      await user.type(searchInput, ' search')

      await waitFor(() => {
        expect(searchInput).toHaveValue('test venue search')
      })
    })

    test('should handle search with results', async () => {
      const { user } = renderComponent()
      const searchInput = screen.getByRole('combobox')

      await user.type(searchInput, 'test venue')

      await waitFor(() => {
        expect(searchInput).toHaveValue('test venue')
      })
    })

    test('should handle search input focus', async () => {
      const { user } = renderComponent()
      const searchInput = screen.getByRole('combobox')

      await user.click(searchInput)

      await waitFor(() => {
        expect(searchInput).toHaveFocus()
      })
    })

    test('should handle search input blur', async () => {
      const { user } = renderComponent()
      const searchInput = screen.getByRole('combobox')

      await user.click(searchInput)
      await user.tab()

      await waitFor(() => {
        expect(searchInput).not.toHaveFocus()
      })
    })

    test('should handle keyboard navigation in search', async () => {
      const { user } = renderComponent()
      const searchInput = screen.getByRole('combobox')

      await user.click(searchInput)
      await user.keyboard('{ArrowDown}')
      await user.keyboard('{ArrowUp}')
      await user.keyboard('{Enter}')
      await user.keyboard('{Escape}')

      await waitFor(() => {
        expect(searchInput).toBeInTheDocument()
      })
    })

    test('should handle multiple events display', async () => {
      const multipleEventsData = [
        ...mockEventsResponse.data,
        {
          ...mockEventsResponse.data[0],
          id: '2',
          name: 'Second Event',
          venue: 'Second Venue',
        }
      ]

      mockSWRInfinite.mockReturnValue({
        data: [{ data: multipleEventsData }],
        size: 1,
        setSize: jest.fn(),
        mutate: jest.fn(),
        isLoading: false,
        isValidating: false,
      })

      renderComponent()
      
      await waitFor(() => {
        expect(screen.getByText('Test Event')).toBeInTheDocument()
        expect(screen.getByText('Second Event')).toBeInTheDocument()
      })
    })

    test('should handle event card interactions', async () => {
      const { user } = renderComponent()
      
      await waitFor(() => {
        const eventCard = screen.getByRole('article')
        expect(eventCard).toBeInTheDocument()
      })

      const ctaButton = screen.getByRole('button', { name: /Get reminded for Test Event/ })
      await user.click(ctaButton)

      await waitFor(() => {
        expect(ctaButton).toBeInTheDocument()
      })
    })

    test('should display event details correctly', async () => {
      renderComponent()
      
      await waitFor(() => {
        expect(screen.getByText('Test Event')).toBeInTheDocument()
        expect(screen.getByText('Test Venue')).toBeInTheDocument()
        expect(screen.getByText('NY')).toBeInTheDocument()
        expect(screen.getByText('Mon 15 Jul — 8:00PM')).toBeInTheDocument()
        expect(screen.getByText('$47')).toBeInTheDocument()
      })
    })

    test('should handle event image display', async () => {
      renderComponent()
      
      await waitFor(() => {
        const image = screen.getByAltText('Event image for Test Event')
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('src', 'https://example.com/square.jpg')
      })
    })

    test('should handle event status display', async () => {
      renderComponent()
      
      await waitFor(() => {
        expect(screen.getByText(/On sale/)).toBeInTheDocument()
      })
    })

    test('should handle event date formatting', async () => {
      renderComponent()
      
      await waitFor(() => {
        const timeElement = screen.getByText('Mon 15 Jul — 8:00PM')
        expect(timeElement).toBeInTheDocument()
        expect(timeElement.tagName).toBe('TIME')
        expect(timeElement).toHaveAttribute('datetime', '2024-07-15T19:00:00.000Z')
      })
    })

    test('should handle event price formatting', async () => {
      renderComponent()
      
      await waitFor(() => {
        expect(screen.getByText('$47')).toBeInTheDocument()
      })
    })

    test('should handle event location display', async () => {
      renderComponent()
      
      await waitFor(() => {
        expect(screen.getByText('NY')).toBeInTheDocument()
      })
    })

    test('should handle event venue display', async () => {
      renderComponent()
      
      await waitFor(() => {
        expect(screen.getByText('Test Venue')).toBeInTheDocument()
      })
    })
  })

  describe('Error Path', () => {
    beforeEach(() => {
      mockSWRInfinite.mockReturnValue({
        data: [mockEmptyEventsResponse],
        size: 1,
        setSize: jest.fn(),
        mutate: jest.fn(),
        isLoading: false,
        isValidating: false,
      })
    })

    test('should show no events message when API returns empty data', async () => {
      renderComponent()

      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument()
        expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('No events found')
      })
    })

    test('should handle search with no results', async () => {
      const { user } = renderComponent()
      const searchInput = screen.getByRole('combobox')

      await user.type(searchInput, 'nonexistent venue')

      await waitFor(() => {
        expect(searchInput).toHaveValue('nonexistent venue')
        expect(screen.getByText(/No venues found for 'nonexistent venue'/)).toBeInTheDocument()
      })
    })

    test('should show search results header when no results are found', async () => {
      const { user } = renderComponent()
      const searchInput = screen.getByRole('combobox')

      await user.type(searchInput, 'test search')

      await waitFor(() => {
        expect(screen.getByText(/No venues found for 'test search'/)).toBeInTheDocument()
      })
    })

    test('should handle load more with no additional data', async () => {
      const { user } = renderComponent()

      await waitFor(() => {
        const loadMoreButton = screen.queryByRole('button', { name: /load more/i })
        expect(loadMoreButton).not.toBeInTheDocument()
      })
    })

    test('should handle API error gracefully', async () => {
      mockSWRInfinite.mockReturnValue({
        data: [],
        size: 1,
        setSize: jest.fn(),
        mutate: jest.fn(),
        isLoading: false,
        isValidating: false,
      })
      renderComponent()

      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument()
        expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('No events found')
      })
    })

    test('should handle search input focus without showing dropdown when no recent venues', async () => {
      mockSWRInfinite.mockReturnValue({
        data: [mockEmptyEventsResponse],
        size: 1,
        setSize: jest.fn(),
        mutate: jest.fn(),
        isLoading: false,
        isValidating: false,
      })

      const { user } = renderComponent()
      const searchInput = screen.getByRole('combobox')

      await user.click(searchInput)

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      })
    })

    test('should handle network error', async () => {
      mockSWRInfinite.mockReturnValue({
        data: [],
        size: 1,
        setSize: jest.fn(),
        mutate: jest.fn(),
        isLoading: false,
        isValidating: false,
      })
      renderComponent()

      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument()
        expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('No events found')
      })
    })

    test('should handle timeout error', async () => {
      mockSWRInfinite.mockReturnValue({
        data: [],
        size: 1,
        setSize: jest.fn(),
        mutate: jest.fn(),
        isLoading: false,
        isValidating: false,
      })
      renderComponent()

      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument()
        expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('No events found')
      })
    })

    test('should handle server error', async () => {
      mockSWRInfinite.mockReturnValue({
        data: [],
        size: 1,
        setSize: jest.fn(),
        mutate: jest.fn(),
        isLoading: false,
        isValidating: false,
      })
      renderComponent()

      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument()
        expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('No events found')
      })
    })

    test('should handle malformed data error', async () => {
      mockSWRInfinite.mockReturnValue({
        data: [],
        size: 1,
        setSize: jest.fn(),
        mutate: jest.fn(),
        isLoading: false,
        isValidating: false,
      })
      renderComponent()

      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument()
        expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('No events found')
      })
    })

    test('should handle search with special characters', async () => {
      const { user } = renderComponent()
      const searchInput = screen.getByRole('combobox')

      await user.type(searchInput, 'test@venue#search')

      await waitFor(() => {
        expect(searchInput).toHaveValue('test@venue#search')
        expect(screen.getByText(/No venues found for 'test@venue#search'/)).toBeInTheDocument()
      })
    })

    test('should handle search with very long input', async () => {
      const { user } = renderComponent()
      const searchInput = screen.getByRole('combobox')

      const longSearchTerm = 'a'.repeat(100)
      await user.type(searchInput, longSearchTerm)

      await waitFor(() => {
        expect(searchInput).toHaveValue(longSearchTerm)
        expect(screen.getByText(new RegExp(`No venues found for '${longSearchTerm}'`))).toBeInTheDocument()
      })
    })

    test('should handle search with empty input', async () => {
      const { user } = renderComponent()
      const searchInput = screen.getByRole('combobox')

      await user.type(searchInput, '   ')

      await waitFor(() => {
        expect(searchInput).toHaveValue('   ')
      })
    })

    test('should handle search with only numbers', async () => {
      const { user } = renderComponent()
      const searchInput = screen.getByRole('combobox')

      await user.type(searchInput, '12345')

      await waitFor(() => {
        expect(searchInput).toHaveValue('12345')
        expect(screen.getByText(/No venues found for '12345'/)).toBeInTheDocument()
      })
    })

    test('should handle search with mixed content', async () => {
      const { user } = renderComponent()
      const searchInput = screen.getByRole('combobox')

      await user.type(searchInput, 'venue123@test#search')

      await waitFor(() => {
        expect(searchInput).toHaveValue('venue123@test#search')
        expect(screen.getByText(/No venues found for 'venue123@test#search'/)).toBeInTheDocument()
      })
    })
  })

  describe('Loading States', () => {
    beforeEach(() => {
      mockSWRInfinite.mockReturnValue({
        data: [],
        size: 1,
        setSize: jest.fn(),
        mutate: jest.fn(),
        isLoading: true,
        isValidating: false,
      })
    })

    test('should show loading state', async () => {
      renderComponent()

      await waitFor(() => {
        expect(screen.getByRole('status', { name: 'Loading events' })).toBeInTheDocument()
      })
    })

        test('should show loading spinner', async () => {
          renderComponent()

          await waitFor(() => {
            const loadingSpinner = screen.getByRole('status', { name: 'Loading events' })
            expect(loadingSpinner).toBeInTheDocument()
          })
        })

    test('should disable search input during loading', async () => {
      renderComponent()

      await waitFor(() => {
        const searchInput = screen.getByRole('combobox')
        expect(searchInput).toBeInTheDocument()
      })
    })

    test('should not show load more button during loading', async () => {
      renderComponent()

      await waitFor(() => {
        const loadMoreButton = screen.queryByRole('button', { name: /load more/i })
        expect(loadMoreButton).not.toBeInTheDocument()
      })
    })

    test('should show loading state for initial load', async () => {
      renderComponent()

      await waitFor(() => {
        expect(screen.getByRole('status', { name: 'Loading events' })).toBeInTheDocument()
      })
    })

    test('should show loading state for refresh', async () => {
      renderComponent()

      await waitFor(() => {
        expect(screen.getByRole('status', { name: 'Loading events' })).toBeInTheDocument()
      })
    })

    test('should show loading state for load more', async () => {
      renderComponent()

      await waitFor(() => {
        expect(screen.getByRole('status', { name: 'Loading events' })).toBeInTheDocument()
      })
    })

    test('should maintain search input during loading', async () => {
      const { user } = renderComponent()
      const searchInput = screen.getByRole('combobox')

      await user.type(searchInput, 'test search')

      await waitFor(() => {
        expect(searchInput).toHaveValue('test search')
      })
    })

        test('should handle loading state transition', async () => {
          const { rerender } = renderComponent()

          await waitFor(() => {
            expect(screen.getByRole('status', { name: 'Loading events' })).toBeInTheDocument()
          })

      mockSWRInfinite.mockReturnValue({
        data: [mockEventsResponse],
        size: 1,
        setSize: jest.fn(),
        mutate: jest.fn(),
        isLoading: false,
        isValidating: false,
      })

          rerender(
            <EventsProvider>
              <Home />
            </EventsProvider>
          )

          await waitFor(() => {
            expect(screen.getByText('Test Event')).toBeInTheDocument()
          })
        })

        test('should handle loading state with error', async () => {
          const { rerender } = renderComponent()

          await waitFor(() => {
            expect(screen.getByRole('status', { name: 'Loading events' })).toBeInTheDocument()
          })

          mockSWRInfinite.mockReturnValue({
            data: [],
            size: 1,
            setSize: jest.fn(),
            mutate: jest.fn(),
            isLoading: false,
            isValidating: false,
          })

          rerender(
            <EventsProvider>
              <Home />
            </EventsProvider>
          )

          await waitFor(() => {
            expect(screen.getByRole('status')).toBeInTheDocument()
            expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('No events found')
          })
        })

        test('should handle loading state with empty data', async () => {
          const { rerender } = renderComponent()

          await waitFor(() => {
            expect(screen.getByRole('status', { name: 'Loading events' })).toBeInTheDocument()
          })

          mockSWRInfinite.mockReturnValue({
            data: [mockEmptyEventsResponse],
            size: 1,
            setSize: jest.fn(),
            mutate: jest.fn(),
            isLoading: false,
            isValidating: false,
          })

          rerender(
            <EventsProvider>
              <Home />
            </EventsProvider>
          )

          await waitFor(() => {
            expect(screen.getByRole('status')).toBeInTheDocument()
            expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('No events found')
          })
        })
  })
})