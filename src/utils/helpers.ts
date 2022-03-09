import { Genre, GenreRecord, Movie, MovieDraft } from '@src/types';
import { GENRES, VALIDATORS_SCHEME } from './constants';

export const arrayToObject = (array: string[] = []): GenreRecord => {
  const genres: { [key: string]: boolean } = {};

  GENRES.forEach((genre) => {
    genres[genre] = array.includes(genre);
  });

  return genres as GenreRecord;
};

export const objectToArray = (genres: GenreRecord): Genre[] =>
  GENRES.filter((genre) => genres[genre]);

export const numToString = (num: number): string => (num ? String(num) : '');

export const capitalize = (str: string): string =>
  str.replace(/^\w/, (s: string) => s.toUpperCase());

export const extractYear = (stringDate: string): string =>
  String(new Date(stringDate).getFullYear());

export const minutesToHours = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const rest = Math.floor(minutes % 60);

  return [hours && `${hours}h`, rest && `${rest}min`].filter((_) => _).join(' ');
};

export const validate = (fieldName: keyof MovieDraft, value: string | GenreRecord) => {
  let errorMessage = '';

  VALIDATORS_SCHEME[fieldName].forEach(({ test, error }) => {
    if (test(value)) {
      errorMessage = error;
    }
  });

  return errorMessage;
};

export const checkStatus = ({ statusText, ok }: Response) => {
  if (!ok) {
    throw Error(statusText);
  }
};

export const replaceMovie = (movies: Movie[], movie: Movie): Movie[] => {
  const index = movies.findIndex(({ id }) => id === movie.id);

  if (index < 0) {
    return movies;
  }

  return [...movies.slice(0, index), movie, ...movies.slice(index + 1)];
};

export const removeMovie = (movies: Movie[], id: number): Movie[] =>
  movies.filter((movie) => movie.id !== id);
