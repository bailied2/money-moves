const ALPHANUMERIC_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const SPECIAL_CHARACTERS = "`~!@#$%^&*()-_=+[{]}\\|;:\"',<.>/?";

function getRandomChar(str) {
  return str.charAt(Math.floor(Math.random() * str.length));
}

const getRandomString = (len, include_special_characters = false) => {
  let random_string = "";
  let possible_chars = ALPHANUMERIC_CHARS;
  if (include_special_characters) {
    possible_chars += SPECIAL_CHARACTERS;
  }
  for (i = 0; i < len; i++) {
    random_string += getRandomChar(possible_chars);
  }
  return random_string;
}

module.exports = getRandomString;