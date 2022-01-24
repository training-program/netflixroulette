import mockData from 'Assets/movieData.json';

const SORTINGMAP = [
  ['Release date', 'release_date'],
  ['Title', 'title'],
  ['Raiting', 'vote_average'],
  ['Popularity', 'vote_count'],
  ['Duration', 'runtime'],
];
const SORTBY = SORTINGMAP.map(opt => opt[0]);
const GENRES = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];

// Mock API
const getMovies = (genre, sortBy, query) => {
  const movies =
    genre !== 'All' ? mockData.filter(movie => movie.genres.includes(genre)) : mockData;
  const order = Object.fromEntries(SORTINGMAP)[sortBy];

  movies.sort((a, b) => {
    if (order === 'release_date') return new Date(b[order]) - new Date(a[order]);
    if (order === 'title') return a[order].codePointAt() - b[order].codePointAt();
    return a[order] - b[order];
  });

  return movies.filter(({ title }) => title.toLowerCase().includes(query.toLowerCase()));
};

const API = {
  getAll(genre = this.genre, sortBy = this.sortBy, query = this.query) {
    this.genre = genre;
    this.sortBy = sortBy;
    this.query = query;

    return new Promise(resolve => {
      setTimeout(() => resolve(getMovies(genre, sortBy, query)), 1000);
    });
  },
  add(movie) {
    return new Promise(resolve => {
      mockData.push(movie);
      setTimeout(() => resolve(mockData), 100);
    });
  },
  edit(id, newMovie) {
    return new Promise(resolve => {
      const index = mockData.findIndex(movie => movie.id === id);
      if (!~index) throw `Movie with id '${id}' not found`;
      mockData[index] = newMovie;
      setTimeout(() => resolve(getMovies(this.genre, this.sortBy, this.query)), 200);
    });
  },
  delete(id) {
    return new Promise(resolve => {
      const index = mockData.findIndex(movie => movie.id === id);
      if (!~index) throw `Movie with id '${id}' not found`;
      mockData.splice(index, 1);
      console.log(mockData);
      setTimeout(() => resolve(getMovies(this.genre, this.sortBy, this.query)), 500);
    });
  },
};

export { GENRES, SORTBY, API };
