const isEmpty = { test: str => !String(str).length, error: 'The field is required' };

const notSelected = {
  test: obj => !Object.values(obj).filter(_ => _).length,
  error: 'Select at least one genre to proceed',
};

const isNumber = { test: str => isNaN(Number(str)), error: 'The value must be a digit' };

const lessThan = limit => ({
  test: str => Number(str) > limit,
  error: `The value should not exceed ${limit}`,
});

const greaterThan = limit => ({
  test: str => Number(str) <= limit,
  error: `The value should be greater than ${limit}`,
});

export { isEmpty, notSelected, isNumber, lessThan, greaterThan };
