export enum Genre {
  'Action' = 'Action',
  'Adventure' = 'Adventure',
  'Animation' = 'Animation',
  'Comedy' = 'Comedy',
  'Crime' = 'Crime',
  'Documentary' = 'Documentary',
  'Drama' = 'Drama',
  'Family' = 'Family',
  'Fantasy' = 'Fantasy',
  'Horror' = 'Horror',
  'Romance' = 'Romance',
  'Science Fiction' = 'Science Fiction',
}

export type GenreRecord = Record<Genre, boolean>;

export enum GenreFilters {
  'All' = 'All',
  'Documentary' = 'Documentary',
  'Comedy' = 'Comedy',
  'Horror' = 'Horror',
  'Crime' = 'Crime',
}

export enum SortFilters {
  'Release date' = 'release_date',
  'Title' = 'title',
  'Raiting' = 'vote_average',
  'Popularity' = 'vote_count',
  'Duration' = 'runtime',
}

export type GenreQueries = keyof typeof GenreFilters;
export type SortQueries = keyof typeof SortFilters;

export type RequestParameters = {
  genre: GenreQueries;
  sortBy: SortQueries;
  query: string;
};

export interface MovieDraft {
  title: string;
  vote_average: number;
  release_date: string;
  poster_path: string;
  overview: string;
  genres: string[];
  runtime: number;
}

export interface Movie extends MovieDraft {
  id: number;
  tagline: string;
  vote_count: number;
  budget: number;
  revenue: number;
}

export type Validator = {
  test: (value: string | GenreRecord) => boolean;
  error: string;
};

type Update = { type: 'UPDATE'; payload: Movie[] };
type Add = { type: 'ADD'; payload: Movie };
type Edit = { type: 'EDIT'; payload: Movie };
type Delete = { type: 'DELETE'; payload: number };

export type ContextAction = Update | Add | Edit | Delete;
export type ProxyContextAction = Add | Edit | Delete;

export type FormVariant = {
  legend: 'Add movie' | 'Edit movie';
  action: 'ADD' | 'EDIT';
  successMessage: string;
};
