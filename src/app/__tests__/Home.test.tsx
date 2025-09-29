import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../page'
import userEvent from '@testing-library/user-event'
import { EventsProvider } from '@/utils/context/EventsContext'
import 'jest-fetch-mock'

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
  })

  test('should render the main heading', () => {
    renderComponent()
    expect(screen.getByText('Up coming events at')).toBeInTheDocument()
  })
})