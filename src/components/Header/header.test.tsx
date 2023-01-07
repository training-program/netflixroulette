import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithRouterAndStore } from '@src/utils/test-utils';
import useQueryString from '@src/hooks/useQueryString';
import Header from './Header';

jest.mock('@src/hooks/useQueryString');
const mockedSetQueryParams = jest.spyOn({ useQueryString }, 'useQueryString');

describe('Header', () => {
  test('should render a search panel', async () => {
    const { container } = renderWithRouterAndStore(<Header />);
    expect(container).toMatchSnapshot();
  });

  test('changes a query parameter when the search button is clicked', async () => {
    const setQueryParams = jest.fn();
    mockedSetQueryParams.mockReturnValue(setQueryParams);

    renderWithRouterAndStore(<Header />);

    fireEvent.input(screen.getByRole('textbox'), {
      target: { value: 'matrix' },
    });

    expect(screen.getByRole('textbox')).toHaveValue('matrix');
    expect(setQueryParams).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(setQueryParams).toHaveBeenCalledWith({ query: 'matrix' });
  });
});
