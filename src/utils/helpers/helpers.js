import { GENRES } from '../constants';

function arrayToObject(array = []) {
  const genres = {};

  GENRES.forEach((genre) => {
    genres[genre] = array.includes(genre);
  });

  return genres;
}

function objectToArray(genres) {
  return Object.keys(genres).filter((genre) => genres[genre]);
}

export { arrayToObject, objectToArray };
