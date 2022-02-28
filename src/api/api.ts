import mockData from '@src/assets/movieData.json';
import { customAlphabet } from 'nanoid';
import { GenreQueries, SortFilters, SortQueries, Movie } from '@src/types';

const nanoid = customAlphabet('1234567890', 7);

// Mock API
const getMovies = (genre: GenreQueries, sortBy: SortQueries, query: string): Movie[] => {
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

  getAll(genre: GenreQueries, sortBy: SortQueries, query: string): Promise<Movie[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getMovies(genre, sortBy, query)), 1200);
    });
  },

  get add() {
    const controller = new AbortController();
    const request = (movie: Movie): Promise<Movie> =>
      new Promise((resolve) => {
        setTimeout(() => {
          const id = Number(nanoid());
          const newMovie = { ...movie, id };

          mockData.push(newMovie);
          resolve(newMovie);
        }, 500);
      });

    return { controller, request };
  },
  get edit() {
    const controller = new AbortController();
    const request = (newMovie: Movie): Promise<Movie> =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const { id } = newMovie;
          const index = mockData.findIndex((movie) => movie.id === id);

          if (index === -1) {
            reject(new Error(`Movie with id '${id}' not found`));
          }

          mockData[index] = newMovie;
          resolve(newMovie);
        }, 1000);
      });

    return { controller, request };
  },

  get delete() {
    const controller = new AbortController();
    const request = (id: number): Promise<void> =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = mockData.findIndex((movie) => movie.id === id);

          if (index === -1) {
            reject(new Error(`Movie with id '${id}' not found`));
          }

          mockData.splice(index, 1);
          resolve();
        }, 500);
      });

    return { controller, request };
  },
};

export default API;
