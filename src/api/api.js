import mockData from '@src/assets/movieData.json';
import { SORTINGMAP } from '@src/utils/constants';

// Mock API
const getMovies = (genre, sortBy, query) => {
  const movies =
    genre !== 'All' ? mockData.filter(movie => movie.genres.includes(genre)) : mockData;
  const order = Object.fromEntries(SORTINGMAP)[sortBy];

  movies.sort((a, b) => {
    if (order === 'release_date') return new Date(b[order]) - new Date(a[order]);
    if (order === 'title')
      return a[order].toLowerCase().codePointAt() - b[order].toLowerCase().codePointAt();

    return a[order] - b[order];
  });

  return movies.filter(({ title }) => title.toLowerCase().includes(query.toLowerCase()));
};

const API = {
  getAll(genre, sortBy, query) {
    return new Promise(resolve => {
      setTimeout(() => resolve({ status: 200, data: getMovies(genre, sortBy, query) }), 1000);
    });
  },
  add(movie) {
    return new Promise(resolve => {
      mockData.push(movie);
      setTimeout(() => resolve({ status: 200 }), 100);
    });
  },
  edit(movie) {
    return new Promise(resolve => {
      const { id } = movie;
      const index = mockData.findIndex(movie => movie.id === id);

      if (index === -1) throw new Error(`Movie with id '${id}' not found`);

      mockData[index] = movie;

      setTimeout(() => resolve({ status: 200 }), 1200);
    });
  },
  delete(id) {
    return new Promise(resolve => {
      const index = mockData.findIndex(movie => movie.id === id);

      if (index === -1) throw new Error(`Movie with id '${id}' not found`);

      mockData.splice(index, 1);

      setTimeout(() => resolve({ status: 200 }), 500);
    });
  },
  tryToCancel() {
    // "if (this.axiosSource) this.axiosSource.cancel()" or smth
  },
};

export default API;
