export const mockEmptyEventsResponse = {
  data: [],
  links: {
    self: '/events?page[number]=1&page[size]=10',
    next: null,
  },
}

export const mockEventsResponse = {
  data: [
    {
      id: '1',
      name: 'Test Event',
      description: 'A test event',
      date: '2024-07-15T19:00:00Z',
      venue: 'Test Venue',
      currency: 'USD',
      price: 5000,
      location: {
        city: 'New York',
        state: 'NY',
        country: 'United States',
        zip: '10001',
        region: 'Northeast',
        lat: 40.7128,
        lng: -74.0060,
        accuracy: 1,
        place: 'Test Venue, New York',
        street: 'Test Street',
      },
      status: 'on-sale',
      sold_out: false,
      featured: false,
      sale_start_date: '2024-01-15T10:00:00Z',
      venues: [
        {
          id: 1,
          name: 'Test Venue',
          url: 'https://example.com',
          city: {
            id: '1',
            name: 'New York',
            code: 'NYC',
            country_alpha3: 'USA',
            country_id: '1',
            country_name: 'United States',
          },
        },
      ],
      event_images: {
        brand: null,
        landscape: 'https://example.com/landscape.jpg',
        portrait: 'https://example.com/portrait.jpg',
        square: 'https://example.com/square.jpg',
      },
      ticket_types: [
        {
          id: 1,
          name: 'General',
          price: {
            total: 5000,
            fees: 300,
            face_value: 4700,
          },
          sold_out: false,
        },
      ],
      lineup: [
        {
          details: 'Main Act',
          time: '20:00',
        },
      ],
      apple_music_tracks: [],
      spotify_tracks: [],
    },
  ],
  links: {
    self: '/events?page[number]=1&page[size]=10',
    next: null,
  },
}

export const mockEventWithMusicResponse = {
  data: [
    {
      id: '2',
      name: 'Music Event',
      description: 'A music event with tracks',
      date: '2024-08-20T20:00:00Z',
      venue: 'Music Venue',
      currency: 'USD',
      price: 7500,
      location: {
        city: 'Los Angeles',
        state: 'CA',
        country: 'United States',
        zip: '90210',
        region: 'West',
        lat: 34.0522,
        lng: -118.2437,
        accuracy: 1,
        place: 'Music Venue, Los Angeles',
        street: 'Music Street',
      },
      status: 'on-sale',
      sold_out: false,
      featured: false,
      sale_start_date: '2024-02-01T12:00:00Z',
      venues: [
        {
          id: 2,
          name: 'Music Venue',
          url: 'https://example.com/music',
          city: {
            id: '2',
            name: 'Los Angeles',
            code: 'LAX',
            country_alpha3: 'USA',
            country_id: '1',
            country_name: 'United States',
          },
        },
      ],
      event_images: {
        brand: null,
        landscape: 'https://example.com/music-landscape.jpg',
        portrait: 'https://example.com/music-portrait.jpg',
        square: 'https://example.com/music-square.jpg',
      },
      ticket_types: [
        {
          id: 2,
          name: 'VIP',
          price: {
            total: 7500,
            fees: 500,
            face_value: 7000,
          },
          sold_out: false,
        },
        {
          id: 3,
          name: 'Early Bird',
          price: {
            total: 6000,
            fees: 400,
            face_value: 5600,
          },
          sold_out: false,
        },
      ],
      lineup: [
        {
          details: 'Headliner',
          time: '21:00',
        },
        {
          details: 'Support Act',
          time: '20:00',
        },
      ],
      apple_music_tracks: [
        {
          open_url: 'https://music.apple.com/track/123',
          preview_url: 'https://example.com/preview.mp3',
          title: 'Sample Track',
        },
      ],
      spotify_tracks: [
        {
          open_url: 'https://open.spotify.com/track/456',
          preview_url: 'https://example.com/spotify-preview.mp3',
          title: 'Spotify Track',
        },
      ],
    },
  ],
  links: {
    self: '/events?page[number]=1&page[size]=10',
    next: null,
  },
}

export const mockSoldOutEventResponse = {
  data: [
    {
      id: '3',
      name: 'Sold Out Event',
      description: 'A sold out event',
      date: '2024-09-10T18:00:00Z',
      venue: 'Popular Venue',
      currency: 'USD',
      price: 10000,
      location: {
        city: 'Chicago',
        state: 'IL',
        country: 'United States',
        zip: '60601',
        region: 'Midwest',
        lat: 41.8781,
        lng: -87.6298,
        accuracy: 1,
        place: 'Popular Venue, Chicago',
        street: 'Popular Street',
      },
      status: 'sold-out',
      sold_out: true,
      featured: false,
      sale_start_date: '2024-01-01T09:00:00Z',
      venues: [
        {
          id: 3,
          name: 'Popular Venue',
          url: 'https://example.com/popular',
          city: {
            id: '3',
            name: 'Chicago',
            code: 'CHI',
            country_alpha3: 'USA',
            country_id: '1',
            country_name: 'United States',
          },
        },
      ],
      event_images: {
        brand: null,
        landscape: 'https://example.com/soldout-landscape.jpg',
        portrait: 'https://example.com/soldout-portrait.jpg',
        square: 'https://example.com/soldout-square.jpg',
      },
      ticket_types: [
        {
          id: 3,
          name: 'General',
          price: {
            total: 10000,
            fees: 600,
            face_value: 9400,
          },
          sold_out: true,
        },
      ],
      lineup: [
        {
          details: 'Main Artist',
          time: '19:00',
        },
      ],
      apple_music_tracks: [],
      spotify_tracks: [],
    },
  ],
  links: {
    self: '/events?page[number]=1&page[size]=10',
    next: null,
  },
}
