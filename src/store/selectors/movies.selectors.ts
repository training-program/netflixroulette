import { RootState } from '..';

export const selectMovies = ({ movies: { movies } }: RootState) => movies;

export const selectRequestParams = ({ movies: { requestParams } }: RootState) => requestParams;

export const selectStatus = ({ movies: { status } }: RootState) => status;

export const selectGenre = ({ movies: { requestParams } }: RootState) => requestParams.genre;

export const selectSortBy = ({ movies: { requestParams } }: RootState) => requestParams.sortBy;

export const selectQuery = ({ movies: { requestParams } }: RootState) => requestParams.query;
