/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie, RequestParams } from '@src/types';
import { STATUSES, INITIAL_STATE } from '@src/utils/constants';

const { LOADING, SUCCESS, ERROR } = STATUSES;

const moviesSlice = createSlice({
  name: 'movies',
  initialState: INITIAL_STATE,
  reducers: {
    fetchMovies(state, action: PayloadAction<Partial<RequestParams>>) {
      state.status = LOADING;
      state.requestParams = { ...state.requestParams, ...action.payload };
    },
    fetchMoviesSuccess(state, action: PayloadAction<Movie[]>) {
      state.status = SUCCESS;
      state.movies = action.payload;
    },
    fetchMoviesError(state) {
      state.status = ERROR;
    },
    createMovie(state, action: PayloadAction<Movie>) {
      state.movies = [action.payload, ...state.movies];
    },
    updateMovies(state, action: PayloadAction<Movie[]>) {
      state.movies = action.payload;
    },
  },
});

export default moviesSlice;
