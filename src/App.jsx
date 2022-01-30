import React, { Component, Suspense, lazy } from 'react';
import { NAV_GENRES, SORT_BY } from '@src/utils/constants';
import API from './api/api';
import styles from './App.module.scss';

import Header from './components/Header/Header.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Spinner from './components/Spinner/Spinner.jsx';
import GenresFilter from './components/GenresFilter/GenresFilter.jsx';
import Sorting from './components/Sorting/Sorting.jsx';

const ResultsBody = lazy(() => import('./components/ResultsBody/ResultsBody.jsx'));
const DeleteForm = lazy(() => import('./components/DeleteForm/DeleteForm.jsx'));
const EditorForm = lazy(() => import('./components/EditorForm/EditorForm.jsx'));
const ModalError = lazy(() => import('./components/ModalError/ModalError.jsx'));

const addMovie = API.add.bind(API);
const editMovie = API.edit.bind(API);
const deleteMovie = API.delete.bind(API);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      loader: true,
      movies: [],
      showAdd: false,
      showEdit: false,
      showDelete: false,
      query: '',
      genre: NAV_GENRES[0],
      sortBy: SORT_BY[0],
    };

    this.handleToggleAdd = this.handleToggleAdd.bind(this);
    this.handleToggleEdit = this.handleToggleEdit.bind(this);
    this.handleToggleDelete = this.handleToggleDelete.bind(this);

    this.addMovie = this.addMovie.bind(this);
    this.editMovie = this.editMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.searchMovies = this.searchMovies.bind(this);
    this.handleCloseModalError = this.handleCloseModalError.bind(this);

    this.setError = this.setError.bind(this);

    this.activeMovieId = NaN;
  }

  componentDidMount() {
    const { genre, sortBy, query } = this.state;

    API.getAll(genre, sortBy, query)
      .then((movies) => this.setState({ movies, loader: false }))
      .catch(this.setError);
  }

  handleToggleAdd() {
    this.setState(({ showAdd }) => ({
      showAdd: !showAdd,
    }));
  }

  handleToggleEdit(id) {
    this.activeMovieId = typeof id === 'number' ? id : NaN;
    this.setState(({ showEdit }) => ({
      showEdit: !showEdit,
    }));
  }

  handleToggleDelete(id) {
    this.activeMovieId = typeof id === 'number' ? id : NaN;
    this.setState(({ showDelete }) => ({
      showDelete: !showDelete,
    }));
  }

  handleCloseModalError() {
    this.setState({ hasError: false });
  }

  get activeMovie() {
    const { movies } = this.state;
    return this.activeMovieId ? movies.find((movie) => movie.id === this.activeMovieId) : {};
  }

  setError(error) {
    console.error(error); // eslint-disable-line
    this.setState({ loader: false, hasError: true });
  }

  addMovie(newMovie) {
    this.setState(({ movies }) => ({
      movies: [newMovie, ...movies],
    }));
  }

  editMovie(updatedMovie) {
    this.setState(({ movies }) => {
      const index = movies.findIndex(({ id }) => id === updatedMovie.id);
      movies.splice(index, 1, updatedMovie);

      return {
        movies,
      };
    });
  }

  deleteMovie(id) {
    this.activeMovieId = NaN;
    this.setState((oldState) => {
      const movies = [...oldState.movies];
      const index = movies.findIndex((movie) => movie.id === id);

      movies.splice(index, 1);

      return { movies };
    });
  }

  searchMovies(param) {
    const { genre: prevGenre, sortBy: prevSortBy, query: prevQuiry } = this.state;
    const { genre = prevGenre, sortBy = prevSortBy, query = prevQuiry } = param;

    this.setState(
      {
        loader: true,
        genre,
        sortBy,
        query,
        ...param,
      },
      () => {
        API.getAll(genre, sortBy, query)
          .then((movies) => this.setState({ movies, loader: false }))
          .catch(this.setError);
      },
    );
  }

  render() {
    const {
      showAdd,
      showEdit,
      showDelete,
      movies,
      loader,
      hasError,
      sortBy,
      genre,
      query,
    } = this.state;

    const {
      id,
      title,
      poster_path,
      genres,
      release_date,
      vote_average,
      runtime,
      overview,
      tagline,
      vote_count,
      budget,
      revenue,
    } = this.activeMovie;

    return (
      <>
        <Header onOpenAdd={this.handleToggleAdd} onSubmit={this.searchMovies} query={query} />
        <ErrorBoundary>
          <Suspense fallback={<Spinner fullscreen />}>
            {showAdd && (
              <EditorForm
                formName="Add movie"
                onClose={this.handleToggleAdd}
                onSubmit={this.addMovie}
                fetchApi={addMovie}
              />
            )}
            {showEdit && (
              <EditorForm
                formName="Edit movie"
                onClose={this.handleToggleEdit}
                onSubmit={this.editMovie}
                fetchApi={editMovie}
                id={id}
                title={title}
                poster_path={poster_path}
                genres={genres}
                release_date={release_date}
                vote_average={vote_average}
                runtime={runtime}
                overview={overview}
                tagline={tagline}
                vote_count={vote_count}
                budget={budget}
                revenue={revenue}
              />
            )}
            {showDelete && (
              <DeleteForm
                onClose={this.handleToggleDelete}
                onSubmit={this.deleteMovie}
                id={id}
                fetchApi={deleteMovie}
              />
            )}
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <section className={styles.container}>
              <div className={styles.controlsBar}>
                <GenresFilter onChange={this.searchMovies} selected={genre} />
                <Sorting onChange={this.searchMovies} selected={sortBy} />
              </div>
              <hr className={styles.hr} />
              <ResultsBody
                loader={loader}
                movies={movies}
                onOpenEdit={this.handleToggleEdit}
                onOpenDelete={this.handleToggleDelete}
              />
            </section>
            <footer className={styles.footer}>
              <span className={styles.footer__title}>
                <b>netflix</b>
                roulette
              </span>
            </footer>

            {hasError && <ModalError onClose={this.handleCloseModalError} />}
          </Suspense>
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
