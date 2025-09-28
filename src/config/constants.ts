const ENVIRONMENT = {
    development: process.env.NEXT_PUBLIC_ENVIRONMENT === 'development',
    production: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production',
};
  

const API_KEY = 'dHmvC0ZXzF4h1mWldfur13c6s4Ix6wCF4OTzozXC'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

const LOCAL_STORAGE_KEYS = {
    RECENT_VENUES: 'recent-venues'
}

const API = {
    routes: {
        events: `${BASE_URL}/events`
    }
}

export const constants = {
    API_KEY,
    API,
    ENVIRONMENT,
    LOCAL_STORAGE_KEYS
}