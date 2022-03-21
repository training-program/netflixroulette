import { RequestParams, Movie } from './types';

export type AppProps = {
  movies: Movie[];
  getMovies: (params?: Partial<RequestParams> | undefined) => void;
  addMovie: (movie: Movie) => void;
  editMovie: (movie: Movie) => void;
  removeMovie: (id: number) => void;
};

export type LocationState = null | {
  backgroundLocation: Location;
};
