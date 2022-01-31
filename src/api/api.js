import mockData from '@src/assets/movieData.json';
import { SORTINGMAP } from '@src/utils/constants';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890', 7);

// Mock API
const getMovies = (genre, sortBy, query) => {
  const movies = mockData.filter(({ genres }) => genre === 'All' || genres.includes(genre));
  const order = Object.fromEntries(SORTINGMAP)[sortBy];

  movies.sort((a, b) => {
    if (order === 'release_date') {
      return new Date(b[order]) - new Date(a[order]);
    }
    if (order === 'title') {
      return a[order].toLowerCase().codePointAt() - b[order].toLowerCase().codePointAt();
    }

    return a[order] - b[order];
  });

  return movies.filter(({ title }) => title.toLowerCase().includes(query.toLowerCase()));
};

const API = {
  getAll(genre, sortBy, query) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getMovies(genre, sortBy, query)), 1200);
    });
  },
  add(movie) {
    this.canceled = false;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.canceled) {
          reject(new Error('Request canceled'));
          return;
        }

        const id = Number(nanoid());
        mockData.push({ ...movie, id });
        resolve({ id });
      }, 500);
    });
  },
  edit(newMovie) {
    this.canceled = false;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.canceled) {
          reject(new Error('Request canceled'));
          return;
        }

        const { id } = newMovie;
        const index = mockData.findIndex((movie) => movie.id === id);

        if (index === -1) {
          throw new Error(`Movie with id '${id}' not found`);
        }

        mockData[index] = newMovie;
        resolve();
      }, 1000);
    });
  },
  delete(id) {
    this.canceled = false;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.canceled) {
          reject(new Error('Request canceled'));
          return;
        }

        const index = mockData.findIndex((movie) => movie.id === id);

        if (index === -1) {
          throw new Error(`Movie with id '${id}' not found`);
        }

        mockData.splice(index, 1);
        resolve();
      }, 500);
    });
  },
  tryToCancel() {
    return new Promise((resolve) => {
      // "if (this.axiosSource) this.axiosSource.cancel()" or smth
      this.canceled = true;
      setTimeout(() => resolve(), 500);
    });
  },
};

export default API;
