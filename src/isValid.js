const isValid = (str) => {
  if (str.length < 8) return false;
  let digit = 0,
    alpha = 0;
  for (let i = 0; i < str.length; i++) {
    if (i < str.lenth - 1 && str[i] === str[i + 1]) {
      return false;
    }
    if (/[0-9]/.test(str[i])) {
      digit++;
    } else if (/[a-zA-Z]/.test(str[i])) {
      alpha++;
    }
    if (digit > 1 && alpha > 1) {
      return true;
    }
  }
  return false;
};
console.log(isValid("1a0819sd"), isValid("3fsfgg1"), isValid("fiaoefoaew"));
