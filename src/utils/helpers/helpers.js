import { GENRES } from '../constants';

const arrayToObject = (array = []) => {
  const genres = {};

  GENRES.forEach((genre) => {
    genres[genre] = array.includes(genre);
  });

  return genres;
};

const objectToArray = (genres) => Object.keys(genres).filter((genre) => genres[genre]);

export { arrayToObject, objectToArray };
