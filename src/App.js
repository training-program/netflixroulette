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

import { GENRES, SORTBY, API } from './api/api.js';

API.getMovies();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { movies: [], showAdd: false, showEdit: false, showDelete: false };

    this.handleToggleAdd = this.handleToggleModal.bind(this, 'showAdd');
    this.handleToggleEdit = this.handleToggleModal.bind(this, 'showEdit');
    this.handleToggleDelete = this.handleToggleModal.bind(this, 'showDelete');
  }
  componentDidMount() {
    API.ready(() => this.setState({ movies: API.movies }));
  }
  handleToggleModal(modal, id) {
    this.setState(oldState => ({
      [modal]: !oldState[modal],
      activeMovieId: id,
    }));
  }
  addMovie(movie) {
    API.add(movie);
  }
  editMovie(movie) {
    API.edit(movie.id, movie);
  }
  deleteMovie(id) {
    API.delete(id);
  }
  changeView(filters) {
    API.filter(filters);
  }
  get getActiveMovie() {
    return this.state.movies.find(movie => movie.id === this.state.activeMovieId);
  }
  render() {
    return (
      <>
        <Header handleOpenAdd={this.handleToggleAdd} />
        <ErrorBoundary>
          <Suspense fallback={<Fallback />}>
            {this.state.showAdd && (
              <ModalEditorContainer
                formName="Add movie"
                handleClose={this.handleToggleAdd}
                onSubmit={this.addMovie}
              />
            )}
            {this.state.showEdit && (
              <ModalEditorContainer
                formName="Edit movie"
                handleClose={this.handleToggleEdit}
                onSubmit={this.editMovie}
                id={this.state.activeMovieId}
                movie={this.getActiveMovie}
              />
            )}
            {this.state.showDelete && (
              <ModalDeleteContainer
                handleClose={this.handleToggleDelete}
                onSubmit={this.deleteMovie}
                id={this.state.activeMovieId}
              />
            )}
          </Suspense>
          <Suspense fallback={<Fallback />}>
            <ResultsBody
              movies={this.state.movies}
              onChange={this.changeView}
              GENRES={GENRES}
              SORTBY={SORTBY}
              handleOpenEdit={this.handleToggleEdit}
              handleOpenDelete={this.handleToggleDelete}
            />
          </Suspense>
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
