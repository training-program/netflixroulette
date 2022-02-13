import { GenresChecklist } from '@src/types';
import { GENRES } from './constants';

export const arrayToObject = (array: string[] = []) => {
  const genres: { [key: string]: boolean } = {};

  GENRES.forEach((genre) => {
    genres[genre] = array.includes(genre);
  });

  return genres as GenresChecklist;
};

export const objectToArray = (genres: GenresChecklist) => GENRES.filter((genre) => genres[genre]);

export const numToString = (num: number) => (num ? String(num) : '');

export const capitalize = (str: string) => str.replace(/^\w/, (s: string) => s.toUpperCase());

export const extractYear = (stringDate: string) => new Date(stringDate).getFullYear();

export const minToHours = (min: number) => {
  const hours = Math.floor(min / 60);
  const mins = Math.floor(min % 60);
  const hString = hours ? `${hours}h` : '';
  const mString = mins ? `${mins}min` : '';

  return [hString, mString].filter((_) => _).join(' ');
};
