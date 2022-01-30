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

const SORT_BY = SORTINGMAP.map((opt) => opt[0]);

const IMG_PLACEHOLDER = 'https://via.placeholder.com/500x750?text=Image+not+found';

export {
  GENRES, NAV_GENRES, SORTINGMAP, SORT_BY, IMG_PLACEHOLDER,
};
