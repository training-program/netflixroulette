import mockData from '@src/assets/movieData.json';
import { customAlphabet } from 'nanoid';
import { GenreFilters, SortFilters, SortBy, Movie } from '@src/types';

const nanoid = customAlphabet('1234567890', 7);

// Mock API
const getMovies = (genre: GenreFilters, sortBy: SortBy, query: string): Movie[] => {
  const movies = mockData.filter(({ genres }) => genre === 'All' || genres.includes(genre));
  const order = SortFilters[sortBy];

  movies.sort((a, b) => {
    if (order === 'release_date') {
      return Number(new Date(b[order])) - Number(new Date(a[order]));
    }

    if (order === 'title') {
      return a[order].localeCompare(b[order], 'en', { sensitivity: 'base' });
    }

    return a[order] - b[order];
  });

  return movies.filter(({ title }) => title.toLowerCase().includes(query.toLowerCase()));
};

const API = {
  canceled: false,

  getAll(genre: GenreFilters, sortBy: SortBy, query: string): Promise<Movie[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getMovies(genre, sortBy, query)), 1200);
    });
  },

  add(movie: Movie): Promise<Movie> {
    this.canceled = false;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.canceled) {
          reject(new Error('Request canceled'));
          return;
        }

        const id = Number(nanoid());
        const newMovie = { ...movie, id };

        mockData.push(newMovie);
        resolve(newMovie);
      }, 500);
    });
  },

  edit(newMovie: Movie): Promise<Movie> {
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
          reject(new Error(`Movie with id '${id}' not found`));
        }

        mockData[index] = newMovie;
        resolve(newMovie);
      }, 1000);
    });
  },

  delete(id: number): Promise<void> {
    this.canceled = false;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.canceled) {
          reject(new Error('Request canceled'));
          return;
        }

        const index = mockData.findIndex((movie) => movie.id === id);

        if (index === -1) {
          reject(new Error(`Movie with id '${id}' not found`));
        }

        mockData.splice(index, 1);
        resolve();
      }, 500);
    });
  },

  tryToCancel(): Promise<void> {
    return new Promise((resolve) => {
      // "if (this.axiosSource) this.axiosSource.cancel()" or smth
      this.canceled = true;
      setTimeout(() => resolve(), 500);
    });
  },
};

export default API;
