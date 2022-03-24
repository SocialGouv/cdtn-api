import "@babel/polyfill";

import axios from "axios";

const PORT = process.env.PORT || 3000;

const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

global.axios = axios.create({
  baseURL: BASE_URL,
});

jest.setTimeout(30000);
