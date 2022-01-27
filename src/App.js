import React, { Component, Suspense, lazy } from 'react';
import API from './api/api';
import { NAV_GENRES, SORT_BY } from '@src/utils/constants';
import styles from './App.module.scss';

import Header from './components/Header/Header';
import ErrorBoundary from './components/ErrorBoundary';
import Spinner from './components/Spinner/Spinner';
import GenresFilter from './components/GenresFilter/GenresFilter';
import Sorting from './components/Sorting/Sorting';

const ResultsBody = lazy(() => import('./components/ResultsBody/ResultsBody'));
const ModalDelete = lazy(() => import('./components/Modals/ModalDelete'));
const ModalEditor = lazy(() => import('./components/Modals/ModalEditor'));
const ModalError = lazy(() => import('./components/Modals/ModalError/ModalError'));

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
      activeMovieId: undefined,
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
  }
  componentDidMount() {
    const { genre, sortBy, query } = this.state;

    API.getAll(genre, sortBy, query)
      .then(this.checkStatus)
      .then(({ data }) => this.setState({ movies: data, loader: false }))
      .catch(this.setError);
  }
  handleToggleAdd() {
    this.setState(({ showAdd }) => {
      if (showAdd) this.tryToCancelFetch();

      return {
        showAdd: !showAdd,
      };
    });
  }
  handleToggleEdit(id) {
    this.setState(({ showEdit }) => {
      if (showEdit) this.tryToCancelFetch();

      return {
        showEdit: !showEdit,
        activeMovieId: typeof id === 'number' ? id : undefined,
      };
    });
  }
  handleToggleDelete(id) {
    this.setState(({ showDelete }) => {
      if (showDelete) this.tryToCancelFetch();

      return {
        showDelete: !showDelete,
        activeMovieId: typeof id === 'number' ? id : undefined,
      };
    });
  }
  handleCloseModalError() {
    this.setState({ hasError: false });
  }
  addMovie(movie) {
    return new Promise((resolve, reject) => {
      API.add(movie)
        .then(this.checkStatus)
        .then(() => {
          resolve();

          this.setState(oldState => {
            const movies = [...oldState.movies];
            movies.push(movie);

            return { movies };
          });
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  }
  editMovie(movie) {
    return new Promise((resolve, reject) => {
      const movies = [...this.state.movies];
      const index = movies.findIndex(({ id }) => id === movie.id);
      const preparedMovie = { ...movies[index], ...movie };
      movies[index] = preparedMovie;

      API.edit(preparedMovie)
        .then(this.checkStatus)
        .then(() => {
          resolve();

          this.setState({ movies });
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  }
  deleteMovie(id) {
    return new Promise(resolve => {
      API.delete(id)
        .then(this.checkStatus)
        .then(() => {
          resolve();

          this.setState(oldState => {
            const movies = [...oldState.movies];
            const index = movies.findIndex(movie => movie.id === id);

            movies.splice(index, 1);

            return { movies };
          });
        })
        .catch(this.setError);
    });
  }
  searchMovies(params) {
    const { genre: prevGenre, sortBy: prevSortBy, query: prevQuery } = this.state;
    const { genre = prevGenre, sortBy = prevSortBy, query = prevQuery } = params;

    if (genre === prevGenre && sortBy === prevSortBy && query === prevQuery) {
      return;
    }

    this.setState({ loader: true, genre, sortBy, query }, () =>
      API.getAll(genre, sortBy, query)
        .then(this.checkStatus)
        .then(({ data }) => this.setState({ movies: data, loader: false }))
        .catch(this.setError)
    );
  }
  setError(error) {
    console.error(error);
    this.setState({ loader: false, hasError: true });
  }
  tryToCancelFetch() {
    API.tryToCancel();
  }
  checkStatus(response) {
    const { status } = response;
    if (status === 200) return response;
    else throw new Error(`The server responded with the status '${status}'`);
  }
  get getActiveMovie() {
    return this.state.movies.find(movie => movie.id === this.state.activeMovieId);
  }
  render() {
    const { showAdd, showEdit, showDelete, activeMovieId, movies, loader, hasError } = this.state;

    return (
      <>
        <Header onOpenAdd={this.handleToggleAdd} onSubmit={this.searchMovies} />
        <ErrorBoundary>
          <Suspense fallback={<Spinner fullscreen />}>
            {showAdd && (
              <ModalEditor
                formName="Add movie"
                onClose={this.handleToggleAdd}
                onSubmit={this.addMovie}
              />
            )}
            {showEdit && (
              <ModalEditor
                formName="Edit movie"
                onClose={this.handleToggleEdit}
                onSubmit={this.editMovie}
                {...this.getActiveMovie}
              />
            )}
            {showDelete && (
              <ModalDelete
                onClose={this.handleToggleDelete}
                onSubmit={this.deleteMovie}
                id={activeMovieId}
              />
            )}
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <section className={styles.container}>
              <div className={styles.controlsBar}>
                <GenresFilter onChange={this.searchMovies} />
                <Sorting onChange={this.searchMovies} />
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
                <b>netflix</b>roulette
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
