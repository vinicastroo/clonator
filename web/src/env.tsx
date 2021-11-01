/* eslint-disable import/no-mutable-exports */
const development = false;

let URL: string;
let URL_BACKEND: string;

if (development) {
  URL = 'http://localhost:3000';
  URL_BACKEND = 'http://localhost:3333';
} else {
  URL = 'http://localhost:3000';
  URL_BACKEND = 'http://localhost:3333';
}

export { URL, URL_BACKEND };
