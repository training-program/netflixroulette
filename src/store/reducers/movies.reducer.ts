import { STATUSES, DEFAULT_FILTERS } from '@src/utils/constants';
import { MoviesState, MoviesAction, MoviesActionType } from '@src/types/';

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
      return { ...state, movies: action.payload };
    }
    case MoviesActionType.DELETE_MOVIE: {
      return { ...state, movies: action.payload };
    }
    default:
      return state;
  }
};

export default moviesReducer;
