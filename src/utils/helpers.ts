import { GenreFilters, GenreQueries, SortFilters, SortQueries } from '@src/types';

export const capitalize = (str: string): string =>
  str.replace(/^\w/, (s: string) => s.toUpperCase());

export const extractYear = (stringDate: string): string =>
  String(new Date(stringDate).getFullYear() || '');

export const minutesToHours = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const rest = Math.floor(minutes % 60);

  return [hours && `${hours}h`, rest && `${rest}min`].filter((_) => _).join(' ');
};

export const checkStatus = ({ statusText, ok }: Response) => {
  if (!ok) {
    throw Error(statusText);
  }
};

export const isGenreString = (string: GenreQueries | string | null): string is GenreQueries =>
  !!string && string in GenreFilters;

export const isSortByString = (string: SortQueries | string | null): string is SortQueries =>
  !!string && string in SortFilters;
