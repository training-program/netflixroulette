import { GENRES } from '../constants';

const arrayToObject = (array = []) => {
  const genres = {};

  GENRES.forEach(genre => (genres[genre] = array.includes(genre)));

  return genres;
};

const objectToArray = genres => {
  const values = [];

  for (const genre in genres) {
    if (genres[genre]) values.push(genre);
  }

  return values;
};

export { arrayToObject, objectToArray };
