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
const API = {
  sortBy: 'Release date',
  genre: 'All',
  async getMovies() {
    this.moviesData = import('Assets/movieData.json');
  },
  async ready(listener) {
    const dataArray = Array.from(await this.moviesData);
    this.map = new Map(dataArray.map(movie => [movie.id, movie]));
    this.listener = listener;
    this.listener();
  },
  async filter({ sortBy = this.sortBy, genre = this.genre }) {
    this.sortBy = sortBy;
    this.genre = genre;
    this.listener();
  },
  async add(movie) {
    this.map.set(movie.id, movie);
    this.listener();
  },
  async edit(id, data) {
    Object.assign(this.map.get(id), data);
    this.listener();
  },
  async delete(id) {
    this.map.delete(id);
    this.listener();
  },
  async getMovie(id) {
    return this.map.get(id);
  },
  get data() {
    return Array.from(this.map.values());
  },
  get movies() {
    const movies =
      this.genre !== 'All'
        ? this.data.filter(movie => movie.genres.includes(this.genre))
        : this.data;
    const query = Object.fromEntries(SORTINGMAP)[this.sortBy];

    movies.sort((a, b) => {
      if (query === 'release_date') return new Date(b[query]) - new Date(a[query]);
      if (query === 'title') return a[query].codePointAt() - b[query].codePointAt();
      return a[query] - b[query];
    });
    return movies;
  },
};

export { GENRES, SORTBY, API };
