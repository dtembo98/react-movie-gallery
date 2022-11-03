import axios from "axios";
import { API_KEY, BASE_URL } from "../utils/constants";

export const getClient = (urlparams?: string) => {
  const options = {
    baseURL: BASE_URL,
  };

  const client = axios.create(options);

  client.interceptors.request.use(
    (requestConfig) => {
      requestConfig.url = `${requestConfig.url}?&api_key=${API_KEY}${
        urlparams || ""
      }`;
      return requestConfig;
    },
    (requestError) => {
      return Promise.reject(requestError);
    }
  );

  return client;
};
