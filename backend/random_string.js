const ALPHANUMERIC_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const SPECIAL_CHARACTERS = "`~!@#$%^&*()-_=+[{]}\\|;:\"',<.>/?";

function getRandomChar(str) {
  return str.charAt(Math.floor(Math.random() * str.length));
}

function getRandomString(len, include_special_characters = false) {
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

let random_string5 = getRandomString(5);
console.log("5 char string: ", random_string5);

let random_string10 = getRandomString(10);
console.log("10 char string: ", random_string10);

let random_string15 = getRandomString(15);
console.log("15 char string: ", random_string15);

let random_string20 = getRandomString(20);
console.log("20 char string: ", random_string20);

let random_string20_special = getRandomString(20, true);
console.log("20 char string: ", random_string20_special);
