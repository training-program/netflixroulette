import React, { MouseEvent, KeyboardEvent } from 'react';
import useQueryString from '@src/hooks/useQueryString';
import { extractYear } from '@src/utils/helpers';
import Poster from '@src/components/Poster/Poster';
import { SEARCH_PARAMS } from '@src/types';
import { MovieCardProps } from './MovieCard.types';

const MovieCard = ({
  id,
  title,
  tagline,
  release_date,
  poster_path,
  onContextMenu,
}: MovieCardProps) => {
  const setQueryString = useQueryString();

  const handleOpenMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    onContextMenu(event, id);
  };

  const handleClick = () => {
    setQueryString(SEARCH_PARAMS.MOVIE, String(id));
  };

  const handlePressUp = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.code === 'Enter') {
      handleClick();
    }
  };

  const year = release_date ? extractYear(release_date) : 'N/A';

  return title ? (
    <div
      className="w-full h-full cursor-pointer"
      onContextMenu={handleOpenMenu}
      onClick={handleClick}
      onKeyUp={handlePressUp}
      role="button"
      tabIndex={0}
      data-test="movie-card"
    >
      <Poster url={poster_path} />
      <div className="w-full mt-5 inline-flex justify-between">
        <div className="inline-flex flex-col w-full">
          <span className="text-lg opacity-70 mb-2">{title}</span>
        </div>
        <div className="min-w-min px-3 h-6 border rounded border-bgray text-">
          <span className="text-sm opacity-70">{year}</span>
        </div>
      </div>
      <span className="text-sm opacity-50">{tagline || title}</span>
    </div>
  ) : null;
};

export default MovieCard;
