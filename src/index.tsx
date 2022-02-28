import { render } from 'react-dom';
import React, { StrictMode } from 'react';
import Context from './Context';
import 'normalize.css';
import './index.scss';

render(
  <StrictMode>
    <Context />
  </StrictMode>,
  document.getElementById('netflixroulette-root'),
);
