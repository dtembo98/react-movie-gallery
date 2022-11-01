import axios from "axios";
import { API_KEY, BASE_URL } from "../utils/constants";

const getClient = (baseUrl: string) => {
  const options = {
    baseURL: baseUrl,
  };

  const client = axios.create(options);

  client.interceptors.request.use(
    (requestConfig) => {
      requestConfig.url = `${requestConfig.url}?&api_key=${API_KEY}`;
      return requestConfig;
    },
    (requestError) => {
      return Promise.reject(requestError);
    }
  );

  return client;
};

export default getClient(BASE_URL);
