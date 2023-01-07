import { MoviesAction, MoviesActionType } from '@src/types';
import { INITIAL_STATE } from '@src/utils/constants';
import moviesReducer from './movies.reducer';

describe('movies reducer', () => {
  test('should return the initial state', () => {
    expect(moviesReducer(undefined, { type: undefined } as unknown as MoviesAction)).toEqual(
      INITIAL_STATE,
    );
  });

  test('should return the fetch loading status', () => {
    expect(
      moviesReducer(undefined, {
        type: MoviesActionType.FETCH_MOVIES,
        payload: {
          genre: 'all',
          sortBy: 'title',
          query: '',
        },
      }),
    ).toMatchObject({
      status: {
        error: false,
        loading: true,
        success: false,
      },
    });
  });

  test('should return the fetch error status', () => {
    expect(
      moviesReducer(undefined, {
        type: MoviesActionType.FETCH_MOVIES_ERROR,
      }),
    ).toMatchObject({
      status: {
        error: true,
        loading: false,
        success: false,
      },
    });
  });

  test('should return the fetch success status', () => {
    expect(
      moviesReducer(undefined, {
        type: MoviesActionType.FETCH_MOVIES_SUCCESS,
        payload: [],
      }),
    ).toMatchObject({
      status: {
        error: false,
        loading: false,
        success: true,
      },
    });
  });
});
