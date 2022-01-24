import React, { Component, Suspense } from 'react';

import Header from './components/Header/Header';
import ErrorBoundary from './components/ErrorBoundary';
import Fallback from './components/Fallback/Fallback';

const ResultsBody = React.lazy(() => import('./components/ResultsBody/ResultsBody.js'));
const ModalDeleteContainer = React.lazy(() =>
  import('./components/Modals/ModalDeleteContainer.js')
);
const ModalEditorContainer = React.lazy(() =>
  import('./components/Modals/ModalEditorContainer.js')
);

import { API } from './api/api.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiError: false,
      loader: true,
      movies: [],
      showAdd: false,
      showEdit: false,
      showDelete: false,
      activeMovieId: undefined,
    };

    this.handleToggleAdd = this.handleToggleAdd.bind(this);
    this.handleToggleEdit = this.handleToggleEdit.bind(this);
    this.handleToggleDelete = this.handleToggleDelete.bind(this);

    this.addMovie = this.addMovie.bind(this);
    this.editMovie = this.editMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.searchMovies = this.searchMovies.bind(this);
  }
  componentDidMount() {
    API.getAll('All', 'Release date', '')
      .then(response => this.setState({ movies: response, loader: false }))
      .catch(this.setError);
  }
  handleToggleAdd() {
    this.setState(oldState => ({
      showAdd: !oldState.showAdd,
    }));
  }
  handleToggleEdit(id) {
    this.setState(oldState => ({
      showEdit: !oldState.showEdit,
      activeMovieId: typeof id === 'number' ? id : undefined,
    }));
  }
  handleToggleDelete(id) {
    this.setState(oldState => ({
      showDelete: !oldState.showDelete,
      activeMovieId: typeof id === 'number' ? id : undefined,
    }));
  }
  setMovies = movies => {
    this.setState({ movies });
  };
  setError = error => {
    console.error(error);
    this.setState({ loading: false, apiError: true });
  };
  addMovie(movie) {
    API.add(movie).then(this.setMovies).catch(this.setError);
  }
  editMovie(movie) {
    API.edit(movie.id, movie).then(this.setMovies).catch(this.setError);
  }
  deleteMovie(id) {
    API.delete(id).then(this.setMovies).catch(this.setError);
  }
  searchMovies({ genre, sortBy, query }) {
    this.setState({ loader: true });
    API.getAll(genre, sortBy, query)
      .then(response => this.setState({ movies: response, loader: false }))
      .catch(this.setError);
  }
  get getActiveMovie() {
    return this.state.movies.find(movie => movie.id === this.state.activeMovieId);
  }
  render() {
    const { showAdd, showEdit, showDelete, activeMovieId, movies, loader } = this.state;

    return (
      <>
        <Header onOpenAdd={this.handleToggleAdd} onSubmit={this.searchMovies} />
        <ErrorBoundary>
          <Suspense fallback={<Fallback fullscreen={true} />}>
            {showAdd && (
              <ModalEditorContainer
                formName="Add movie"
                onClose={this.handleToggleAdd}
                onSubmit={this.addMovie}
              />
            )}
            {showEdit && (
              <ModalEditorContainer
                formName="Edit movie"
                onClose={this.handleToggleEdit}
                onSubmit={this.editMovie}
                id={activeMovieId}
                movie={this.getActiveMovie}
              />
            )}
            {showDelete && (
              <ModalDeleteContainer
                onClose={this.handleToggleDelete}
                onSubmit={this.deleteMovie}
                id={activeMovieId}
              />
            )}
          </Suspense>
          <Suspense fallback={<Fallback />}>
            <ResultsBody
              loader={loader}
              movies={movies}
              onChange={this.searchMovies}
              onOpenEdit={this.handleToggleEdit}
              onOpenDelete={this.handleToggleDelete}
            />
          </Suspense>
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
