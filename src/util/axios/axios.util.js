import axios from "axios";
const apiRootPath = process.env.REACT_APP_BASE_URL;

export const instance = axios.create({
  timeout: 10 * 1000,
  baseURL: apiRootPath,
});
