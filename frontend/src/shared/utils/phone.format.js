export const mobileFormat = (mobile) => {
  let text = mobile.replace(
    /(\d)(\d\d\d)(\d\d\d)(\d\d)(\d\d)/,
    "+$1($2)$3-$4-$5"
  );
  return text;
};
