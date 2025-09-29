import 'jest-fetch-mock'

declare global {
  var fetch: jest.MockedFunction<typeof fetch>
}
