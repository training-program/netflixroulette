import React from 'react';
import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { screen } from '@testing-library/react';
import { renderWithRouterAndStore } from './utils/test-utils';
import '@testing-library/jest-dom';
import App from './App';

const handlers = [
  rest.get('http://localhost:4000/movies', (_, res, ctx) =>
    res(
      ctx.json({
        data: [
          {
            budget: 160000000,
            genres: ['Action', 'Science Fiction', 'Adventure'],
            id: 27205,
            overview:
              'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: "inception", the implantation of another person\'s idea into a target\'s subconscious.',
            poster_path: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
            release_date: '2010-07-15',
            revenue: 825532764,
            runtime: 148,
            tagline: 'Your mind is the scene of the crime.',
            title: 'Inception',
            vote_average: 8.4,
            vote_count: 31109,
          },
        ],
      }),
      ctx.delay(150),
    ),
  ),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('fetches and recieved movies while first rendering', async () => {
  renderWithRouterAndStore(<App />);

  expect(screen.queryByText(/Loading.../i)).toBeInTheDocument();
  expect(await screen.findByText(/Inception/i)).toBeInTheDocument();
});
