process.env.NEXT_PUBLIC_BASE_URL = 'https://api.example.com'
import '@testing-library/jest-dom'

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

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    const { fill, priority, ...restProps } = props
    return <img {...restProps} />
  },
}))

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
