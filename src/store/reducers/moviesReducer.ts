import { STATUSES, DEFAULT_FILTERS } from '@src/utils/constants';
import { MoviesState, MoviesAction, MoviesActionType } from './moviesReducer.types';

const { INITIAL, LOADING, SUCCESS, ERROR } = STATUSES;

const initialState: MoviesState = {
  movies: [],
  status: INITIAL,
  requestParams: DEFAULT_FILTERS,
};

const moviesReducer = (state = initialState, action: MoviesAction): MoviesState => {
  switch (action.type) {
    case MoviesActionType.FETCH_MOVIES: {
      const { requestParams } = state;

      return { ...state, status: LOADING, requestParams: { ...requestParams, ...action.payload } };
    }
    case MoviesActionType.FETCH_MOVIES_SUCCESS: {
      return { ...state, status: SUCCESS, movies: action.payload };
    }
    case MoviesActionType.FETCH_MOVIES_ERROR: {
      return { ...state, status: ERROR };
    }
    case MoviesActionType.CREATE_MOVIE: {
      return { ...state, movies: [action.payload, ...state.movies] };
    }
    case MoviesActionType.UPDATE_MOVIE: {
      const { movies } = state;
      const { payload: movie } = action;
      const index = movies.findIndex(({ id }) => id === movie.id);

      if (index < 0) {
        return state;
      }

      return { ...state, movies: [...movies.slice(0, index), movie, ...movies.slice(index + 1)] };
    }
    case MoviesActionType.DELETE_MOVIE: {
      return { ...state, movies: state.movies.filter(({ id }) => id !== action.payload) };
    }
    default:
      return state;
  }
};

export default moviesReducer;
