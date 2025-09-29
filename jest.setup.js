// Set up environment variables for tests
process.env.NEXT_PUBLIC_BASE_URL = 'https://api.example.com'

// Import testing library
import '@testing-library/jest-dom'

// Set up fetch mock
import fetchMock from 'jest-fetch-mock'

// Enable fetch mocking
fetchMock.enableMocks()

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    }
  },
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  },
}))

// Mock SWR
jest.mock('swr', () => ({
  __esModule: true,
  default: () => ({
    data: undefined,
    error: undefined,
    isLoading: false,
    mutate: jest.fn(),
  }),
}))

jest.mock('swr/infinite', () => ({
  __esModule: true,
  default: () => ({
    data: undefined,
    error: undefined,
    isLoading: false,
    isValidating: false,
    size: 1,
    setSize: jest.fn(),
    mutate: jest.fn(),
  }),
}))
