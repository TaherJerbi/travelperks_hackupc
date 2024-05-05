export type Genre = (typeof SEGMENTS)[number]["genres"][number];
export const SEGMENTS = [
  {
    name: "Miscellaneous",
    genres: [
      "Casino/Gaming",
      "Fairs & Festivals",
      "Food & Drink",
      "Ice Shows",
      "Lecture/Seminar",
      "Psychics/Mediums/Hypnotists",
    ],
  },
  {
    name: "Sports",
    genres: [
      "Athletic Races",
      "Badminton",
      "Baseball",
      "Basketball",
      "Body Building",
      "Boxing",
      "Cricket",
      "Cycling",
      "Equestrian",
      "eSports",
      "Fitness",
      "Football",
      "Golf",
      "Gymnastics",
      "Handball",
      "Hockey",
      "Ice Skating",
      "Indoor Soccer",
      "Lacrosse",
      "Martial Arts",
      "Miscellaneous",
      "Motorsports/Racing",
      "Rugby",
      "Skiing",
      "Soccer",
      "Softball",
      "Squash",
      "Surfing",
      "Swimming",
      "Table Tennis",
      "Tennis",
      "Track & Field",
      "Volleyball",
      "Waterpolo",
      "Wrestling",
      "Ringuette",
      "Padel",
    ],
  },
  {
    name: "Music",
    genres: [
      "Alternative",
      "Ballads/Romantic",
      "Blues",
      "Chanson Francaise",
      "Classical",
      "Country",
      "Dance/Electronic",
      "Folk",
      "Hip-Hop/Rap",
      "Holiday",
      "Jazz",
      "Latin",
      "Metal",
      "New Age",
      "Pop",
      "R&B",
      "Reggae",
      "Religious",
      "Rock",
    ],
  },
  {
    name: "Arts & Theatre",
    genres: [
      "Circus & Specialty Acts",
      "Classical",
      "Cultural",
      "Dance",
      "Fashion",
      "Fine Art",
      "Magic & Illusion",
      "Music",
      "Opera",
      "Performance Art",
      "Puppetry",
      "Spectacular",
      "Theatre",
    ],
  },
  {
    name: "Film",
    genres: [
      "Action/Adventure",
      "Animation",
      "Arthouse",
      "Comedy",
      "Documentary",
      "Drama",
      "Family",
      "Foreign",
      "Horror",
      "Music",
      "Science Fiction",
      "Urban",
    ],
  },
] as const;

const API_KEY = "oGWo9O2GhBZZAdCV1xAAs9FUrClY0QQn";
const SEARCH_EVENTS_URL = `https://app.ticketmaster.com/discovery/v2/events`;
export async function getEvents(city: string, genres: Genre[]) {
  const events: Event[] = [];
  for (const genre of genres) {
    const response = await fetch(
      `${SEARCH_EVENTS_URL}.json?apikey=${API_KEY}&city=${city}&keyword=${genre}`
    );
    const data = await response.json();
    events.push(...data._embedded.events);
  }

  return events;
}

interface Image {
  ratio: string; // Example values: "16_9", "3_2"
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}

interface Classification {
  primary: boolean;
  segment: {
    id: string;
    name: string;
  };
  genre: {
    id: string;
    name: string;
  };
  subGenre: {
    id: string;
    name: string;
  };
  family: boolean;
}

interface Sales {
  public: {
    startDateTime: string; // ISO 8601 format
    startTBD: boolean;
    startTBA: boolean;
    endDateTime: string; // ISO 8601 format
  };
}

interface Dates {
  start: {
    localDate: string; // example: '2030-01-01'
    localTime: string; // example: '11:07:00'
    dateTime: string; // ISO 8601 format
    dateTBD: boolean;
    dateTBA: boolean;
    timeTBA: boolean;
    noSpecificTime: boolean;
  };
  timezone: string;
  status: {
    code: string;
  };
  spanMultipleDays: boolean;
}

interface Links {
  self: {
    href: string;
  };
  venues: {
    href: string;
  }[];
}

interface Venue {
  name: string;
  type: string; // Always expect "venue"
  id: string;
  test: boolean;
  url: string;
  locale: string;
  postalCode: string;
  timezone: string;
  city: {
    name: string;
  };
  state: {
    name: string;
  };
  country: {
    name: string;
    countryCode: string;
  };
  address: {
    line1: string;
  };
  location: {
    longitude: string;
    latitude: string;
  };
  upcomingEvents: {
    _total: number;
    _filtered: number;
  };
  _links: Links; // Same as Links defined above
}

interface Embedded {
  venues: Venue[];
}

interface Event {
  name: string;
  type: string; // Will always be "event"
  id: string;
  test: boolean;
  url: string;
  locale: string;
  images: Image[];
  sales: Sales;
  dates: Dates;
  classifications: Classification[];
  promoter: {
    id: string;
    name: string;
  };
  promoters: {
    id: string;
    name: string;
  }[];
  _links: Links;
  _embedded: Embedded;
}
