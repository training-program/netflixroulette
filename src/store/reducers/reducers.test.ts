import { DEFAULT_FILTERS, INITIAL_STATE, STATUSES } from '@src/utils/constants';
import movieSlice, { actions } from './moviesSlice';

test('should return the initial state', () => {
  expect(movieSlice.reducer(undefined, { type: undefined })).toEqual(INITIAL_STATE);
  expect(movieSlice.reducer(INITIAL_STATE, actions.fetchMovies(DEFAULT_FILTERS))).toEqual({
    movies: [],
    requestParams: DEFAULT_FILTERS,
    status: STATUSES.LOADING,
  });
  expect(movieSlice.reducer(INITIAL_STATE, actions.fetchMoviesSuccess([]))).toEqual({
    movies: [],
    requestParams: DEFAULT_FILTERS,
    status: STATUSES.SUCCESS,
  });
  expect(movieSlice.reducer(INITIAL_STATE, actions.fetchMoviesError())).toEqual({
    movies: [],
    requestParams: DEFAULT_FILTERS,
    status: STATUSES.ERROR,
  });
});
