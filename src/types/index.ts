export enum Genres {
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

export type GenresChecklist = { [Property in Genres]: boolean };

export enum NavGenres {
  'All' = 'All',
  'Documentary' = 'Documentary',
  'Comedy' = 'Comedy',
  'Horror' = 'Horror',
  'Crime' = 'Crime',
}

export enum SortingMap {
  'Release date' = 'release_date',
  'Title' = 'title',
  'Raiting' = 'vote_average',
  'Popularity' = 'vote_count',
  'Duration' = 'runtime',
}

export type SortBy = keyof typeof SortingMap;

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
  test: (value: string | GenresChecklist) => boolean;
  error: string;
};
