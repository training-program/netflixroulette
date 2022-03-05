import { RequestParams, Movie, GenreFilters, SortFilters } from '@src/types';
import { API_PATH, GET_MOVIES_PATH } from '@src/utils/constants';
import { removeEmpty, checkStatus } from '@src/utils/helpers';

const API = {
  getAll({ genre, sortBy, query }: RequestParams): Promise<Movie[]> {
    const url = new URL(GET_MOVIES_PATH, API_PATH);
    const { searchParams } = url;
    const order = SortFilters[sortBy];
    const filter = GenreFilters[genre];

    searchParams.append('sortBy', order);

    if (filter) {
      searchParams.append('filter', filter);
    }

    if (query) {
      searchParams.append('search', query);
    }

    return new Promise((resolve, reject) => {
      fetch(url.href)
        .then((response) => {
          checkStatus(response);

          return response.json();
        })
        .then(({ data }) => resolve(data))
        .catch(reject);
    });
  },

  send(method: 'PUT' | 'POST') {
    const controller = new AbortController();

    const request = (movie: Movie): Promise<Movie> =>
      new Promise((resolve, reject) => {
        const { signal } = controller;
        const cleanMovie = removeEmpty(movie);

        fetch(API_PATH, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          signal,
          body: JSON.stringify(cleanMovie),
        })
          .then((response) => {
            checkStatus(response);

            return response.json();
          })
          .then(resolve)
          .catch(reject);
      });

    return { controller, request };
  },

  get delete() {
    const controller = new AbortController();

    const request = (id: number): Promise<void> =>
      new Promise((resolve, reject) => {
        const { signal } = controller;

        fetch(`${API_PATH}/${id}`, {
          method: 'DELETE',
          signal,
        })
          .then((response) => {
            checkStatus(response);
            resolve();
          })
          .catch(reject);
      });

    return { controller, request };
  },
};

export default API;
