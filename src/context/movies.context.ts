import { Dispatch, createContext } from 'react';
import { Movie, ContextAction } from '@src/types';

type Context = {
  movies: Movie[];
  dispatch: Dispatch<ContextAction>;
};

const MoviesContext = createContext<Context>({ movies: [], dispatch: () => {} });

export default MoviesContext;
