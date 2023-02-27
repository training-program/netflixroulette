/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie, RequestParams } from '@src/types';
import { STATUSES, INITIAL_STATE } from '@src/utils/constants';
import { findIndexById } from '@src/utils/helpers';

const { LOADING, SUCCESS, ERROR } = STATUSES;

const moviesSlice = createSlice({
  name: 'movies',
  initialState: INITIAL_STATE,
  reducers: {
    fetchMovies(state, { payload }: PayloadAction<Partial<RequestParams>>) {
      state.status = LOADING;
      state.requestParams = { ...state.requestParams, ...payload };
    },
    fetchMoviesSuccess(state, { payload }: PayloadAction<Movie[]>) {
      state.status = SUCCESS;
      state.movies = payload;
    },
    fetchMoviesError(state) {
      state.status = ERROR;
    },
    createMovie({ movies }, { payload }: PayloadAction<Movie>) {
      movies.unshift(payload);
    },
    updateMovie({ movies }, { payload }: PayloadAction<Movie>) {
      movies[findIndexById(movies, payload.id)] = payload;
    },
    deleteMovie({ movies }, { payload }: PayloadAction<number>) {
      movies.splice(findIndexById(movies, payload), 1);
    },
  },
});

export const { actions } = moviesSlice;

export default moviesSlice;
