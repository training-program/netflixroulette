import { Validator } from '@src/types';

export const isEmpty: Validator = {
  test: (str) => !String(str).length,
  error: 'The field is required',
};

export const notSelected: Validator = {
  test: (obj) => !Object.values(obj).filter((_) => _).length,
  error: 'Select at least one genre to proceed',
};

export const isNumber: Validator = {
  test: (str) => Number.isNaN(Number(str)),
  error: 'The value must be a digit',
};

export const lessThan = (limit: number): Validator => ({
  test: (str) => Number(str) > limit,
  error: `The value should not exceed ${limit}`,
});

export const greaterThan = (limit: number): Validator => ({
  test: (str) => Number(str) <= limit,
  error: `The value should be greater than ${limit}`,
});

export const isURI: Validator = {
  test: (link) => !/^\D+:\/\/\w+\.\w+/.test(String(link)),
  error: `The value should be a link`,
};
