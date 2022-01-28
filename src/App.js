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
const DeleteMovieForm = lazy(() => import('./components/Modals/DeleteMovieForm/DeleteMovieForm'));
const EditorForm = lazy(() => import('./components/Modals/EditorForm/EditorForm'));
const ModalError = lazy(() => import('./components/Modals/ModalError/ModalError'));

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
      activeMovieId: NaN,
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
      .then(movies => this.setState({ movies, loader: false }))
      .catch(this.setError);
  }
  handleToggleAdd() {
    this.setState(({ showAdd }) => {
      return {
        showAdd: !showAdd,
      };
    });
  }
  handleToggleEdit(id) {
    this.setState(({ showEdit }) => {
      return {
        showEdit: !showEdit,
        activeMovieId: typeof id === 'number' ? id : NaN,
      };
    });
  }
  handleToggleDelete(id) {
    this.setState(({ showDelete }) => {
      return {
        showDelete: !showDelete,
        activeMovieId: typeof id === 'number' ? id : NaN,
      };
    });
  }
  handleCloseModalError() {
    this.setState({ hasError: false });
  }
  addMovie(newMovie) {
    this.setState(({ movies }) => ({
      movies: [newMovie, ...movies],
    }));
  }
  editMovie(updatedMovie) {
    this.setState(({ movies }) => {
      const index = movies.findIndex(({ id }) => id === updatedMovie.id);
      movies[index] = updatedMovie;

      return {
        movies,
      };
    });
  }
  deleteMovie(id) {
    this.setState(oldState => {
      const movies = [...oldState.movies];
      const index = movies.findIndex(movie => movie.id === id);

      movies.splice(index, 1);

      return { movies };
    });
  }
  searchMovies({ genre = this.state.genre, sortBy = this.state.sortBy, query = this.state.query }) {
    this.setState({ loader: true, genre, sortBy, query }, () =>
      API.getAll(genre, sortBy, query)
        .then(movies => this.setState({ movies, loader: false }))
        .catch(this.setError)
    );
  }
  setError(error) {
    console.error(error);
    this.setState({ loader: false, hasError: true });
  }
  get getActiveMovie() {
    return this.state.movies.find(movie => movie.id === this.state.activeMovieId);
  }
  render() {
    const {
      showAdd,
      showEdit,
      showDelete,
      activeMovieId,
      movies,
      loader,
      hasError,
      sortBy,
      genre,
      query,
    } = this.state;

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
                {...this.getActiveMovie}
                fetchApi={editMovie}
              />
            )}
            {showDelete && (
              <DeleteMovieForm
                onClose={this.handleToggleDelete}
                onSubmit={this.deleteMovie}
                id={activeMovieId}
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
