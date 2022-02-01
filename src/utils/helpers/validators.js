export const isEmpty = { test: (str) => !String(str).length, error: 'The field is required' };

export const notSelected = {
  test: (obj) => !Object.values(obj).filter((_) => _).length,
  error: 'Select at least one genre to proceed',
};

export const isNumber = {
  test: (str) => Number.isNaN(Number(str)),
  error: 'The value must be a digit',
};

export const lessThan = (limit) => ({
  test: (str) => Number(str) > limit,
  error: `The value should not exceed ${limit}`,
});

export const greaterThan = (limit) => ({
  test: (str) => Number(str) <= limit,
  error: `The value should be greater than ${limit}`,
});
