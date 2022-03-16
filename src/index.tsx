import { render } from 'react-dom';
import React, { StrictMode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import NoMatch from './components/NoMatch/NoMatch';
import 'normalize.css';
import './index.scss';

render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Navigate to="/search" replace />} />
          <Route path="search" element={<App />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('netflixroulette-root'),
);
