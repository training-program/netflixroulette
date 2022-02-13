import {
  Genres, NavGenres, SortingMap, SortBy,
} from '@src/types';

const GENRES: Genres[] = [
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

const NAV_GENRES: NavGenres[] = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];

const IMG_PLACEHOLDER = 'https://via.placeholder.com/500x750?text=Image+not+found';

export { GENRES, NAV_GENRES, IMG_PLACEHOLDER };

export const SORT_BY = Object.keys(SortingMap) as SortBy[];
