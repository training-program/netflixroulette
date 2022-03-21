import { RequestParams, Movie, GenreFilters, SortFilters, BaseMovie } from '@src/types';
import { API_PATH, GET_MOVIES_PATH } from '@src/utils/constants';
import { checkStatus } from '@src/utils/helpers';

const API = {
  getAll({ genre, sortBy, query }: RequestParams): Promise<Movie[]> {
    const url = new URL(GET_MOVIES_PATH, API_PATH);
    const { searchParams } = url;
    const order = SortFilters[sortBy];
    const filter = GenreFilters[genre];

    searchParams.append('sortBy', order);
    searchParams.append('sortOrder', order === SortFilters.title ? 'asc' : 'desc');

    if (filter) {
      searchParams.append('filter', filter);
    }

    if (query) {
      searchParams.append('search', query);
    }

    return fetch(url.href)
      .then((response) => {
        checkStatus(response);

        return response.json();
      })
      .then(({ data }) => data);
  },

  send(method: 'PUT' | 'POST') {
    const controller = new AbortController();

    const request = (movie: BaseMovie): Promise<Movie> => {
      const { signal } = controller;
      const safeMovie: BaseMovie = { ...movie };

      if (safeMovie.tagline === '') {
        delete safeMovie.tagline;
      }

      if (method === 'POST') {
        delete safeMovie.id;
      }

      return fetch(API_PATH, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        signal,
        body: JSON.stringify(safeMovie),
      }).then((response) => {
        checkStatus(response);

        return response.json();
      });
    };

    return { controller, request };
  },

  get delete() {
    const controller = new AbortController();

    const request = (id: number): Promise<void> => {
      const { signal } = controller;

      return fetch(`${API_PATH}/${id}`, {
        method: 'DELETE',
        signal,
      }).then((response) => {
        checkStatus(response);
      });
    };

    return { controller, request };
  },
};

export default API;
