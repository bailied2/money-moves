const POSSIBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function getRandomChar(str) {
  return str.charAt(Math.floor(Math.random() * str.length));
}

function getRandomString(len) {
  let random_string = "";
  for (i = 0; i < len; i++) {
    random_string += getRandomChar(POSSIBLE_CHARS);
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
