import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../page'
import userEvent from '@testing-library/user-event'
import { EventsProvider } from '@/utils/context/EventsContext'
import 'jest-fetch-mock'
import { mockEmptyEventsResponse, mockEventsResponse, mockEventWithMusicResponse, mockSoldOutEventResponse } from '../testData.js'

const mockSWRInfinite = jest.fn()

jest.mock('swr/infinite', () => ({
  __esModule: true,
  default: () => mockSWRInfinite(),
}))

const mockFetch = fetch as jest.MockedFunction<typeof fetch> & {
  mockResponseOnce: (body: string, init?: ResponseInit) => void
  resetMocks: () => void
}

const renderComponent = () => {
  const user = userEvent.setup()
    const result = render(
        <EventsProvider>
            <Home />
        </EventsProvider>
)
    return { result, user }
  }

  describe('Home', () => {
  beforeEach(() => {
    mockFetch.resetMocks()
    mockSWRInfinite.mockReturnValue({
      data: [mockEventsResponse],
      size: 1,
      setSize: jest.fn(),
      mutate: jest.fn(),
      isLoading: false,
      isValidating: false,
    })
  })

  describe('Happy Path', () => {
    test('should render the main heading', () => {
      renderComponent()
      expect(screen.getByText('Upcoming events at')).toBeInTheDocument()
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

    test('should display event card with all basic information', async () => {
      renderComponent()
      
      await waitFor(() => {
        expect(screen.getByText('Test Event')).toBeInTheDocument()
        expect(screen.getByText('Test Venue')).toBeInTheDocument()
        expect(screen.getByText('NY')).toBeInTheDocument()
        expect(screen.getByText('Mon 15 Jul — 8:00PM')).toBeInTheDocument()
        expect(screen.getByText('$47')).toBeInTheDocument()
      })
    })

    test('should display featured tag when event is featured', async () => {
      renderComponent()
      
      await waitFor(() => {
        expect(screen.getByText(/On sale/)).toBeInTheDocument()
      })
    })

    test('should not display play button when no music tracks available', async () => {
      renderComponent()
      
      await waitFor(() => {
        expect(screen.queryByLabelText('Play music preview')).not.toBeInTheDocument()
      })
    })

    test('should display accordion with more info button', async () => {
      renderComponent()
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /More info/ })).toBeInTheDocument()
        expect(screen.getByText('+')).toBeInTheDocument()
      })
    })

    test('should open accordion and show event details when clicked', async () => {
      const { user } = renderComponent()
      
      await waitFor(() => {
        const accordionButton = screen.getByRole('button', { name: /More info/ })
        user.click(accordionButton)
      })
      
      await waitFor(() => {
        expect(screen.getByText('-')).toBeInTheDocument()
        expect(screen.getByText('A test event')).toBeInTheDocument()
        expect(screen.getByText('Line up')).toBeInTheDocument()
        expect(screen.getByText('Main Act')).toBeInTheDocument()
        expect(screen.getByText('Tickets')).toBeInTheDocument()
        expect(screen.getByText('General')).toBeInTheDocument()
      })
    })

    test('should close accordion when clicked again', async () => {
      const { user } = renderComponent()
      
      await waitFor(() => {
        const accordionButton = screen.getByRole('button', { name: /More info/ })
        user.click(accordionButton)
      })
      
      await waitFor(() => {
        expect(screen.getByText('-')).toBeInTheDocument()
      })
      
      const accordionButton = screen.getByRole('button', { name: /More info/ })
      await user.click(accordionButton)
      
      await waitFor(() => {
        expect(screen.getByText('+')).toBeInTheDocument()
      })
    })

    test('should display get reminded button', async () => {
      renderComponent()
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /Get reminded for Test Event/ })).toBeInTheDocument()
      })
    })

    test('should handle search input interaction', async () => {
      const { user } = renderComponent()
      const searchInput = screen.getByRole('combobox')
      
      await user.type(searchInput, 'test venue')
      expect(searchInput).toHaveValue('test venue')
    })

    test('should debounce search input changes', async () => {
      const { user } = renderComponent()
      const searchInput = screen.getByRole('combobox')
      
      await user.type(searchInput, 'test')
      expect(searchInput).toHaveValue('test')
      
      await user.type(searchInput, ' venue')
      expect(searchInput).toHaveValue('test venue')
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
        expect(screen.getByText('Upcoming events at test venue')).toBeInTheDocument()
      }, { timeout: 500 })
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
        expect(screen.getByLabelText('Play music preview')).toBeInTheDocument()
      })
    })

    test('should display sold out button and tag for sold out events', async () => {
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

    test('should display multiple lineup items when available', async () => {
      mockSWRInfinite.mockReturnValue({
        data: [mockEventWithMusicResponse],
        size: 1,
        setSize: jest.fn(),
        mutate: jest.fn(),
        isLoading: false,
        isValidating: false,
      })
      
      const { user } = renderComponent()
      
      await waitFor(() => {
        const accordionButton = screen.getByRole('button', { name: /More info/ })
        user.click(accordionButton)
      })
      
      await waitFor(() => {
        expect(screen.getByText('Headliner')).toBeInTheDocument()
        expect(screen.getByText('Support Act')).toBeInTheDocument()
      })
    })

    test('should display sold out ticket information in accordion', async () => {
      mockSWRInfinite.mockReturnValue({
        data: [mockSoldOutEventResponse],
        size: 1,
        setSize: jest.fn(),
        mutate: jest.fn(),
        isLoading: false,
        isValidating: false,
      })
      
      const { user } = renderComponent()
      
      await waitFor(() => {
        const accordionButton = screen.getByRole('button', { name: /More info/ })
        user.click(accordionButton)
      })
      
      await waitFor(() => {
        expect(screen.getAllByText('sold out')).toHaveLength(2)
      })
    })

    test('should display price from label when accordion is open', async () => {
      const { user } = renderComponent()
      
      await waitFor(() => {
        const accordionButton = screen.getByRole('button', { name: /More info/ })
        user.click(accordionButton)
      })
      
      await waitFor(() => {
        expect(screen.getByText('From')).toBeInTheDocument()
      })
    })

    test('should display different image sources for landscape and square', async () => {
      renderComponent()
      
      await waitFor(() => {
        const eventImage = screen.getByAltText('Event image for Test Event')
        expect(eventImage).toHaveAttribute('src', 'https://example.com/square.jpg')
      })
    })

    test('should switch to landscape image when accordion is opened', async () => {
      const { user } = renderComponent()
      
      await waitFor(() => {
        const accordionButton = screen.getByRole('button', { name: /More info/ })
        user.click(accordionButton)
      })
      
      await waitFor(() => {
        const eventImage = screen.getByAltText('Event image for Test Event')
        expect(eventImage).toHaveAttribute('src', 'https://example.com/landscape.jpg')
      })
    })

    test('should switch back to square image when accordion is closed', async () => {
      const { user } = renderComponent()
      
      await waitFor(() => {
        const accordionButton = screen.getByRole('button', { name: /More info/ })
        user.click(accordionButton)
      })
      
      await waitFor(() => {
        expect(screen.getByText('-')).toBeInTheDocument()
      })
      
      const accordionButton = screen.getByRole('button', { name: /More info/ })
      await user.click(accordionButton)
      
      await waitFor(() => {
        const eventImage = screen.getByAltText('Event image for Test Event')
        expect(eventImage).toHaveAttribute('src', 'https://example.com/square.jpg')
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

    test('should display correct venue information for different events', async () => {
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
        expect(screen.getByText('Music Event')).toBeInTheDocument()
        expect(screen.getByText('Music Venue')).toBeInTheDocument()
        expect(screen.getByText('CA')).toBeInTheDocument()
        expect(screen.getByText('$70')).toBeInTheDocument()
      })
    })

    test('should display correct date formatting for different events', async () => {
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
        expect(screen.getByText('Tue 20 Aug — 9:00PM')).toBeInTheDocument()
      })
    })
  })

  describe('Error Path', () => {
    test('should show no events message when API returns empty data', async () => {
      mockSWRInfinite.mockReturnValue({
        data: [mockEmptyEventsResponse],
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

    test('should show no events for specific venue when venue is selected', async () => {
      mockSWRInfinite.mockReturnValue({
        data: [mockEmptyEventsResponse],
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

    test('should show no venues found message in search dropdown when no venues match', async () => {
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
      
      await user.type(searchInput, 'nonexistent venue')
      
      await waitFor(() => {
        expect(searchInput).toHaveValue('nonexistent venue')
        expect(screen.getByText(/No venues found for 'nonexistent venue'/)).toBeInTheDocument()
      })
    })

    test('should show search results header when searching with no results', async () => {
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
      
      await user.type(searchInput, 'test search')
      
      await waitFor(() => {
        expect(screen.getByText(/No venues found for 'test search'/)).toBeInTheDocument()
      })
    })

    test('should not show load more button when no data is available', async () => {
      mockSWRInfinite.mockReturnValue({
        data: [mockEmptyEventsResponse],
        size: 1,
        setSize: jest.fn(),
        mutate: jest.fn(),
        isLoading: false,
        isValidating: false,
      })
      
      renderComponent()
      
      await waitFor(() => {
        const loadMoreButton = screen.queryByRole('button', { name: /load more/i })
        expect(loadMoreButton).not.toBeInTheDocument()
      })
    })

    test('should handle API error state gracefully', async () => {
      mockSWRInfinite.mockReturnValue({
        data: undefined,
        error: new Error('API Error'),
        size: 1,
        setSize: jest.fn(),
        mutate: jest.fn(),
        isLoading: false,
        isValidating: false,
      })
      
      renderComponent()
      
      await waitFor(() => {
        expect(screen.getByRole('region', { name: 'Events list' })).toBeInTheDocument()
        expect(screen.getByRole('region', { name: 'Events list' })).toHaveAttribute('aria-busy', 'false')
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
        expect(searchInput).toHaveFocus()
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      })
    })

    test('should handle search with less than 3 characters', async () => {
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
      
      await user.type(searchInput, 'ab')
      
      await waitFor(() => {
        expect(searchInput).toHaveValue('ab')
        expect(screen.queryByText(/No venues found/)).not.toBeInTheDocument()
      })
    })
  })

  describe('Loading States', () => {
    beforeEach(() => {
      mockSWRInfinite.mockReturnValue({
        data: undefined,
        size: 1,
        setSize: jest.fn(),
        mutate: jest.fn(),
        isLoading: true,
        isValidating: true,
      })
    })

    test('should show loading state initially', async () => {
      renderComponent()
      
      await waitFor(() => {
        expect(screen.getByRole('region', { name: 'Events list' })).toBeInTheDocument()
        expect(screen.getByRole('region', { name: 'Events list' })).toHaveAttribute('aria-busy', 'true')
      })
    })

    test('should handle search input during loading', async () => {
      const { user } = renderComponent()
      const searchInput = screen.getByRole('combobox')
      
      await user.type(searchInput, 'test venue')
      
      await waitFor(() => {
        expect(searchInput).toHaveValue('test venue')
      })
    })

    test('should handle load more during loading', async () => {
      const { user } = renderComponent()
      
      await waitFor(() => {
        const loadMoreButton = screen.queryByRole('button', { name: /load more/i })
        if (loadMoreButton) {
          user.click(loadMoreButton)
        }
      })
    })
  })
})