export const requireValidate = (value) => {
  return value.trim() !== '';
};

export const emailValidate = (value) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
};

const runValidations = (value, validators) => {
  return validators.map((validator) => ({
    test: validator.name,
    result: validator(value),
  }));
};

const printErrorMessage = (validationResult) => {
  let message = '';
  const messages = validationResult
    .filter((res) => !res.result)
    .map((res) => res.test);
  if (messages.includes('emailValidate')) {
    message = 'Invalid email format';
  } else if (messages.includes('requireValidate')) {
    message = 'Required';
  }
  return message;
};

const validate = (value, validators) =>
  printErrorMessage(runValidations(value, validators));

export default validate;
