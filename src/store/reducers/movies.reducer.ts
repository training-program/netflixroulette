import { STATUSES, INITIAL_STATE } from '@src/utils/constants';
import { MoviesState, MoviesAction, MoviesActionType } from '@src/types/';

const { LOADING, SUCCESS, ERROR } = STATUSES;

const moviesReducer = (state = INITIAL_STATE, action: MoviesAction): MoviesState => {
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
