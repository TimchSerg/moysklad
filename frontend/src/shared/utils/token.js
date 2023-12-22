export let isErrorToken = (error) => {
  let textError = error;
  const regexp = new RegExp(/(токен)/gi);

  regexp.lastIndex = 0;
  return regexp.test(textError);
};
