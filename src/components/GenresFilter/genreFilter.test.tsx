import React from 'react';
import { renderWithRouterAndStore } from '@src/utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import useQueryString from '@src/hooks/useQueryString';
import GenresFilter from './GenresFilter';
import '@testing-library/jest-dom';

jest.mock('@src/hooks/useQueryString');
const mockedSetQueryParams = jest.spyOn({ useQueryString }, 'useQueryString');

describe('GenreFilter', () => {
  test('Select genre set store', () => {
    const setQueryParams = jest.fn();
    mockedSetQueryParams.mockReturnValue(setQueryParams);

    renderWithRouterAndStore(<GenresFilter />);

    fireEvent.click(screen.getByRole('button', { name: /comedy/i }));

    expect(setQueryParams).toHaveBeenCalledWith({ genre: 'comedy' });
  });
});
