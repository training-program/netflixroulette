const GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'Horror',
  'Romance',
  'Science Fiction',
];

const NAV_GENRES = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];

const SORTINGMAP = [
  ['Release date', 'release_date'],
  ['Title', 'title'],
  ['Raiting', 'vote_average'],
  ['Popularity', 'vote_count'],
  ['Duration', 'runtime'],
];

const SORTBY = SORTINGMAP.map(opt => opt[0]);

export { GENRES, NAV_GENRES, SORTINGMAP, SORTBY };
