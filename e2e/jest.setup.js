import "@babel/polyfill";

import axios from "axios";

const PORT = process.env.PORT || 3000;

global.axios = axios.create({
  baseURL: `http://localhost:${PORT}`,
});

jest.setTimeout(30000);
